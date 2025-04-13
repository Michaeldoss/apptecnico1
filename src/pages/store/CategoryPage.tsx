
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import ProductList from '@/components/store/ProductList';
import { getProductsByCategory } from '@/data/products';
import { Product } from '@/types/product';
import { ChevronLeft } from 'lucide-react';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    // Map slug to category name
    const getCategoryNameFromSlug = (slug: string) => {
      const mapping: { [key: string]: string } = {
        'cabecas-de-impressao': 'Cabeças de Impressão',
        'componentes-de-impressao': 'Componentes de Impressão',
        'pecas-de-reposicao': 'Peças de Reposição'
      };
      return mapping[slug] || 'Produtos';
    };

    if (categorySlug) {
      const name = getCategoryNameFromSlug(categorySlug);
      setCategoryName(name);
      const categoryProducts = getProductsByCategory(name);
      setProducts(categoryProducts);
    }
  }, [categorySlug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatedContainer animation="fade" className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/store">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{categoryName}</h1>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground">
              {products.length} produtos encontrados nesta categoria.
            </p>
          </div>
        </AnimatedContainer>

        <AnimatedContainer animation="fade">
          <ProductList 
            products={products} 
            showCategory={false}
          />
        </AnimatedContainer>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
