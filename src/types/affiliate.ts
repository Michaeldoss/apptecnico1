export interface AffiliateProfile {
  id: string;
  user_id: string;
  affiliate_slug: string;
  is_active: boolean;
  affiliate_since: string;
  total_sales: number;
  total_commission: number;
  commission_pending: number;
  commission_paid: number;
  created_at: string;
  updated_at: string;
}

export interface AffiliateSale {
  id: string;
  affiliate_id: string;
  buyer_id?: string;
  product_id?: string;
  product_name: string;
  sale_amount: number;
  commission_percent: number;
  commission_value: number;
  status: 'pendente' | 'confirmado' | 'pago' | 'cancelado';
  origin: 'link' | 'qr' | 'app_indicacao';
  order_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductAffiliateSetting {
  id: string;
  product_id: string;
  product_name: string;
  category?: string;
  is_affiliate_enabled: boolean;
  commission_percent: number;
  created_at: string;
  updated_at: string;
}

export interface AffiliateWithdrawal {
  id: string;
  affiliate_id: string;
  amount: number;
  status: 'solicitado' | 'processando' | 'pago' | 'cancelado';
  payment_method: string;
  payment_details?: any;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AffiliateStats {
  totalSales: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  salesCount: number;
  conversionRate: number;
}