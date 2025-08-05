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
          "font-bold text-white mb-2",
          isMobile ? "text-xl" : "text-2xl"
        )}>
          🎯 Materiais de Divulgação
        </h2>
        <p className="text-blue-100">Gere e compartilhe seus links personalizados</p>
      </div>

      {/* Link Geral da Loja - Estilo Hotmart */}
      <Card className="bg-white/20 backdrop-blur-sm border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <ExternalLink className="h-5 w-5 text-yellow-400" />
            Link Principal da Loja
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-blue-100">Seu link de afiliado principal</Label>
            <div className="flex gap-2">
              <Input 
                value={generalLink} 
                className="font-mono text-sm bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard(generalLink, 'Link')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
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
              className="flex-1 bg-green-500/20 border-green-400/50 text-green-100 hover:bg-green-500/30"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button 
              variant="outline"
              onClick={() => generateQRCode(generalLink)}
              className="flex-1 bg-purple-500/20 border-purple-400/50 text-purple-100 hover:bg-purple-500/30"
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Link Específico de Produto */}
      <Card className="bg-white/20 backdrop-blur-sm border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">🎯 Link de Produto Específico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-blue-100">Selecione um produto</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Escolha um produto..." />
              </SelectTrigger>
              <SelectContent className="bg-blue-800 border-blue-600">
                {products.slice(0, 10).map((product) => (
                  <SelectItem key={product.codigo} value={product.codigo} className="text-white hover:bg-blue-700">
                    {product.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {productLink && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-blue-100">Link do produto selecionado</Label>
                <div className="flex gap-2">
                  <Input 
                    value={productLink} 
                    className="font-mono text-sm bg-white/10 border-white/20 text-white"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(productLink, 'Link do produto')}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
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
                  className="flex-1 bg-green-500/20 border-green-400/50 text-green-100 hover:bg-green-500/30"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => generateQRCode(productLink)}
                  className="flex-1 bg-purple-500/20 border-purple-400/50 text-purple-100 hover:bg-purple-500/30"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mensagem Personalizada */}
      <Card className="bg-white/20 backdrop-blur-sm border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">✏️ Mensagem Personalizada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-blue-100">Personalize sua mensagem de divulgação</Label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Digite uma mensagem personalizada para acompanhar seus links..."
              className="w-full p-3 border rounded-md resize-none h-20 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
            <p className="text-xs text-blue-200">
              Esta mensagem será incluída quando você compartilhar seus links
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Estratégias de Divulgação - Estilo Hotmart */}
      <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">💡 Estratégias de Divulgação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2 p-4 bg-white/10 rounded-lg">
              <Badge variant="outline" className="text-green-300 border-green-400/50 bg-green-500/20">📱 WhatsApp</Badge>
              <p className={cn(
                "text-blue-100",
                isMobile ? "text-sm" : ""
              )}>
                Grupos de técnicos, gráficas e profissionais da área
              </p>
            </div>
            <div className="space-y-2 p-4 bg-white/10 rounded-lg">
              <Badge variant="outline" className="text-purple-300 border-purple-400/50 bg-purple-500/20">📱 Redes Sociais</Badge>
              <p className={cn(
                "text-blue-100",
                isMobile ? "text-sm" : ""
              )}>
                Instagram, Facebook, LinkedIn e TikTok
              </p>
            </div>
            <div className="space-y-2 p-4 bg-white/10 rounded-lg">
              <Badge variant="outline" className="text-orange-300 border-orange-400/50 bg-orange-500/20">🏢 Presencial</Badge>
              <p className={cn(
                "text-blue-100",
                isMobile ? "text-sm" : ""
              )}>
                QR Codes em eventos, feiras e lojas físicas
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
            <p className="text-yellow-200 font-medium">
              🚀 Dica: Use vídeos e depoimentos pessoais para aumentar a conversão!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};