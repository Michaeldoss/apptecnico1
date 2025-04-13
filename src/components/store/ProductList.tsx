
import React from 'react';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Box, Tag, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ProductListProps {
  products: Product[];
  title?: string;
  showCategory?: boolean;
}

const ProductList = ({ products, title, showCategory = true }: ProductListProps) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <TooltipProvider>
          {products.map((product) => (
            <Card key={product.codigo} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="font-mono">
                        COD: {product.codigo}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Código do produto</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {showCategory && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="ml-2">
                          {product.categoria}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Categoria do produto</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <CardTitle className="text-lg mt-2">
                  {product.nome}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <div className="flex items-center">
                    <Box className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Unidade: {product.unidade}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="mr-1 h-4 w-4 text-muted-foreground" />
                    {product.ncm && <span>NCM: {product.ncm}</span>}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(product.preco)}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`flex items-center ${product.estoque > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <AlertCircle className="mr-1 h-4 w-4" />
                          <span>{product.estoque > 0 ? `Estoque: ${product.estoque}` : 'Sem estoque'}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {product.estoque > 0 
                          ? `${product.estoque} unidades disponíveis` 
                          : 'Produto temporariamente indisponível'}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full gap-2"
                  variant={product.estoque > 0 ? "default" : "secondary"}
                  disabled={product.estoque === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.estoque > 0 ? 'Adicionar ao carrinho' : 'Avise-me quando chegar'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductList;
