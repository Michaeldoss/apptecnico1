
export interface Product {
  codigo: string;
  nome: string;
  unidade: string;
  estoque: number;
  preco: number;
  ncm?: string;
  categoria: string;
}

export type ProductCategory = {
  name: string;
  slug: string;
  count: number;
  description: string;
  icon: React.ReactNode;
}
