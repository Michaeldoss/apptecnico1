
export interface MarketplaceProduct {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  nome: string;
  categoria: ProductCategory;
  subcategoria?: string;
  preco: number;
  precoOriginal?: number;
  desconto?: number;
  imagens: string[];
  imagemPrincipal: string;
  descricao: string;
  especificacoesTecnicas: string;
  
  // Compatibilidade
  tipoEquipamento: EquipmentType[];
  marca: string[];
  modelosCompativeis: string[];
  
  // Dados técnicos
  codigoInterno: string;
  sku?: string;
  ncm?: string;
  referenciaFabricante: string;
  
  // Estoque e logística
  quantidadeEstoque: number;
  peso: number; // kg
  dimensoes: {
    comprimento: number; // cm
    largura: number;
    altura: number;
  };
  
  // Garantia e fiscal
  garantiaDias: number;
  notaFiscalDisponivel: boolean;
  observacoes?: string;
  
  // Status
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export type ProductCategory = 
  | 'damper'
  | 'capping'
  | 'wiper'
  | 'flat-cable'
  | 'cabeca-impressao'
  | 'filtros'
  | 'rolos'
  | 'placas'
  | 'motores'
  | 'sensores'
  | 'fusores'
  | 'bombas'
  | 'correias'
  | 'pecas-uv'
  | 'pecas-dtf'
  | 'eco-solvente'
  | 'sublimacao'
  | 'cnc'
  | 'outros';

export type EquipmentType = 
  | 'DTF'
  | 'UV'
  | 'Solvente'
  | 'Eco-solvente'
  | 'Sublimática'
  | 'CNC'
  | 'Látex'
  | 'Plotters'
  | 'Outros';

export interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  vendorId: string;
  vendorName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShippingAddress;
  trackingCode?: string;
  notaFiscal?: {
    numero: string;
    cnpj: string;
    arquivo: string;
  };
}

export type OrderStatus = 
  | 'aguardando-pagamento'
  | 'pago'
  | 'faturado'
  | 'enviado'
  | 'concluido'
  | 'estornado'
  | 'cancelado';

export type PaymentMethod = 'pix' | 'cartao' | 'saldo-app';
export type PaymentStatus = 'pendente' | 'aprovado' | 'recusado' | 'estornado';

export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface VendorDashboard {
  totalVendasMes: number;
  produtosEstoqueBaixo: number;
  pedidosPendentes: number;
  pedidosPagos: number;
  faturamentoMes: number;
  faturamentoAno: number;
}

export interface VendorFinancial {
  valorTotalVenda: number;
  comissaoPlataforma: number;
  percentualComissao: number;
  valorLiquido: number;
  status: 'aguardando-saque' | 'transferido';
  dataSaque?: string;
}
