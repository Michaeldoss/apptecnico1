import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, QrCode, Share2, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { products } from '@/data/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AffiliateLinksProps {
  affiliateSlug: string;
  getAffiliateLink: (productId?: string) => string;
}

export const AffiliateLinks: React.FC<AffiliateLinksProps> = ({ 
  affiliateSlug, 
  getAffiliateLink 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const isMobile = useIsMobile();

  const generalLink = getAffiliateLink();
  const productLink = selectedProduct ? getAffiliateLink(selectedProduct) : '';

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copiado!",
        description: `${type} copiado para a área de transferência.`
      });
    });
  };

  const shareLink = (link: string, product?: string) => {
    const message = customMessage || `Confira ${product ? `este produto: ${product}` : 'nossa loja'} com preços especiais! ${link}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Instalei - Marketplace',
        text: message,
        url: link
      });
    } else {
      copyToClipboard(message, 'Mensagem');
    }
  };

  const generateQRCode = (link: string) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`;
    window.open(qrUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className={cn(
          "font-bold text-gray-900 mb-2",
          isMobile ? "text-xl" : "text-2xl"
        )}>
          Minha Loja
        </h2>
        <p className="text-gray-600">Gere e compartilhe seus links de afiliado</p>
      </div>

      {/* Link Geral da Loja */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Link Geral da Loja
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Seu link de afiliado principal</Label>
            <div className="flex gap-2">
              <Input 
                value={generalLink} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(generalLink, 'Link')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "flex gap-2",
            isMobile ? "flex-col" : ""
          )}>
            <Button 
              variant="outline" 
              onClick={() => shareLink(generalLink)}
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button 
              variant="outline"
              onClick={() => generateQRCode(generalLink)}
              className="flex-1"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Gerar QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Link Específico de Produto */}
      <Card>
        <CardHeader>
          <CardTitle>Link Específico de Produto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Selecione um produto</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um produto..." />
              </SelectTrigger>
              <SelectContent>
                {products.slice(0, 10).map((product) => (
                  <SelectItem key={product.codigo} value={product.codigo}>
                    {product.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {productLink && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Link do produto selecionado</Label>
                <div className="flex gap-2">
                  <Input 
                    value={productLink} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(productLink, 'Link do produto')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className={cn(
                "flex gap-2",
                isMobile ? "flex-col" : ""
              )}>
                <Button 
                  variant="outline"
                  onClick={() => shareLink(productLink, products.find(p => p.codigo === selectedProduct)?.nome)}
                  className="flex-1"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => generateQRCode(productLink)}
                  className="flex-1"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Gerar QR Code
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mensagem Personalizada */}
      <Card>
        <CardHeader>
          <CardTitle>Mensagem Personalizada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Personalize sua mensagem de divulgação</Label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Digite uma mensagem personalizada para acompanhar seus links..."
              className="w-full p-3 border rounded-md resize-none h-20"
            />
            <p className="text-xs text-gray-500">
              Esta mensagem será incluída quando você compartilhar seus links
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dicas */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">💡 Dicas para Divulgação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Badge variant="outline" className="text-blue-700 border-blue-300">WhatsApp</Badge>
            <p className={cn(
              "text-blue-700",
              isMobile ? "text-sm" : ""
            )}>
              Compartilhe em grupos de técnicos e gráficas
            </p>
          </div>
          <div className="space-y-1">
            <Badge variant="outline" className="text-blue-700 border-blue-300">Redes Sociais</Badge>
            <p className={cn(
              "text-blue-700",
              isMobile ? "text-sm" : ""
            )}>
              Publique no Instagram, Facebook e LinkedIn
            </p>
          </div>
          <div className="space-y-1">
            <Badge variant="outline" className="text-blue-700 border-blue-300">QR Code</Badge>
            <p className={cn(
              "text-blue-700",
              isMobile ? "text-sm" : ""
            )}>
              Imprima e distribua em eventos e lojas físicas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};