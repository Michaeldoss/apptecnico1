
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCategory } from '@/types/product';
import { motion } from 'framer-motion';

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
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-primary">{category.icon}</div>
                <span className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">
                  {category.count} itens
                </span>
              </div>
              <CardTitle className="mt-4">{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to={`/store/category/${category.slug}`} className="w-full">
                <Button variant="outline" className="w-full">Ver Produtos</Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryList;
