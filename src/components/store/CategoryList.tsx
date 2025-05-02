
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCategory } from '@/types/product';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryListProps {
  categories: ProductCategory[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="h-full"
        >
          <Card className="h-full group hover:shadow-md transition-all border-primary/10 hover:border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  {category.icon}
                </div>
                <span className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">
                  {category.count} itens
                </span>
              </div>
              <CardTitle className="mt-4">{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                {/* Sample product images - In a real app, you'd fetch actual product images */}
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="aspect-square rounded-md bg-muted/50 flex items-center justify-center overflow-hidden"
                  >
                    <img 
                      src="/placeholder.svg" 
                      alt={`Produto ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/store/category/${category.slug}`} className="w-full">
                <Button variant="outline" className="w-full group-hover:border-primary/30 group-hover:text-primary transition-colors flex justify-between">
                  <span>Ver Produtos</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryList;
