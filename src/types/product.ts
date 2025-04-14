
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
  // Additional fields
  codigoBarras?: string;
  referencia?: string;
  dimensao?: string;
  ativo?: boolean;
  nomePDV?: string;
  precoTotal?: number;
  fornecedor?: string;
  fabricante?: string;
  marca?: string;
  comissao?: number;
  comissaoVista?: number;
  comissaoPrazo?: number;
  comissaoQuitacao?: number;
  origem?: string;
  tipoProduto?: string;
  custoUltimaCompra?: number;
  custoMedioAtual?: number;
  custoMedioInicial?: number;
  lucroDesejado?: number;
  pesoKg?: number;
  pesoLiqKg?: number;
  altura?: number;
  largura?: number;
  comprimento?: number;
  estoqueMinimo?: number;
  estoqueMaximo?: number;
  enderecoProduto?: string;
  departamento?: number;
  informacoesNutricionais?: boolean;
  tabelaNutricional?: {
    valorEnergetico?: number;
    carboidratos?: number;
    proteinas?: number;
    fibraAlimentar?: number;
    gordurasTotais?: number;
    gordurasSaturadas?: number;
    gordurasTrans?: number;
    sodio?: number;
  };
  extraFields?: {
    [key: string]: string;
  };
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
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  cnpj?: string;
  contactName?: string;
  password?: string;
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

export interface TaxInfo {
  fiscal?: string;
  ncm?: string;
  cfop?: string;
  icms?: number;
  icmsSt?: number;
  ipi?: number;
  pis?: number;
  cofins?: number;
  csosn?: string;
  cest?: string;
  origem?: string;
}
