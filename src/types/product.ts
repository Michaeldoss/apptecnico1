
export interface Product {
  codigo: string;
  nome: string;
  unidade: string;
  estoque: number;
  preco: number;
  ncm?: string;
  categoria: string;
  imagem?: string;
  descricao?: string;
  emDestaque?: boolean;
  desconto?: number;
  avaliacoes?: number;
  empresaId?: number;
  empresaNome?: string;
}

export type ProductCategory = {
  name: string;
  slug: string;
  count: number;
  description: string;
  icon: React.ReactNode;
}

export interface Company {
  id: number;
  name: string;
  description: string;
  logo: string;
  rating: number;
  productCount: number;
  location: string;
  featured?: boolean;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  discountPercentage?: number;
  discountAmount?: number;
  productIds?: string[];
  categorySlug?: string;
  link: string;
  validUntil?: Date;
}
