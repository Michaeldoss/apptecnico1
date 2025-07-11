export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      affiliate_profiles: {
        Row: {
          affiliate_since: string
          affiliate_slug: string
          commission_paid: number | null
          commission_pending: number | null
          created_at: string
          id: string
          is_active: boolean
          total_commission: number | null
          total_sales: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliate_since?: string
          affiliate_slug: string
          commission_paid?: number | null
          commission_pending?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          total_commission?: number | null
          total_sales?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliate_since?: string
          affiliate_slug?: string
          commission_paid?: number | null
          commission_pending?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          total_commission?: number | null
          total_sales?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      affiliate_sales: {
        Row: {
          affiliate_id: string
          buyer_id: string | null
          commission_percent: number
          commission_value: number
          created_at: string
          id: string
          order_id: string | null
          origin: string
          product_id: string | null
          product_name: string
          sale_amount: number
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          buyer_id?: string | null
          commission_percent: number
          commission_value: number
          created_at?: string
          id?: string
          order_id?: string | null
          origin?: string
          product_id?: string | null
          product_name: string
          sale_amount: number
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          buyer_id?: string | null
          commission_percent?: number
          commission_value?: number
          created_at?: string
          id?: string
          order_id?: string | null
          origin?: string
          product_id?: string | null
          product_name?: string
          sale_amount?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_sales_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_withdrawals: {
        Row: {
          affiliate_id: string
          amount: number
          created_at: string
          id: string
          payment_details: Json | null
          payment_method: string
          processed_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          amount: number
          created_at?: string
          id?: string
          payment_details?: Json | null
          payment_method?: string
          processed_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          amount?: number
          created_at?: string
          id?: string
          payment_details?: Json | null
          payment_method?: string
          processed_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_withdrawals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_affiliate_settings: {
        Row: {
          category: string | null
          commission_percent: number
          created_at: string
          id: string
          is_affiliate_enabled: boolean
          product_id: string
          product_name: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          commission_percent?: number
          created_at?: string
          id?: string
          is_affiliate_enabled?: boolean
          product_id: string
          product_name: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          commission_percent?: number
          created_at?: string
          id?: string
          is_affiliate_enabled?: boolean
          product_id?: string
          product_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      tecnico_pagamento_config: {
        Row: {
          conta_verificada: boolean | null
          created_at: string
          id: string
          mercadopago_access_token: string | null
          mercadopago_user_id: string | null
          taxa_plataforma: number | null
          tecnico_id: string
          updated_at: string
        }
        Insert: {
          conta_verificada?: boolean | null
          created_at?: string
          id?: string
          mercadopago_access_token?: string | null
          mercadopago_user_id?: string | null
          taxa_plataforma?: number | null
          tecnico_id: string
          updated_at?: string
        }
        Update: {
          conta_verificada?: boolean | null
          created_at?: string
          id?: string
          mercadopago_access_token?: string | null
          mercadopago_user_id?: string | null
          taxa_plataforma?: number | null
          tecnico_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      transacoes: {
        Row: {
          cliente_id: string
          comprovante_url: string | null
          created_at: string
          data_liberacao: string | null
          data_pagamento: string | null
          id: string
          meio_pagamento: string
          mercadopago_payment_id: string | null
          mercadopago_preference_id: string | null
          servico_id: string
          status: string
          tecnico_id: string
          updated_at: string
          valor_total: number
        }
        Insert: {
          cliente_id: string
          comprovante_url?: string | null
          created_at?: string
          data_liberacao?: string | null
          data_pagamento?: string | null
          id?: string
          meio_pagamento: string
          mercadopago_payment_id?: string | null
          mercadopago_preference_id?: string | null
          servico_id: string
          status?: string
          tecnico_id: string
          updated_at?: string
          valor_total: number
        }
        Update: {
          cliente_id?: string
          comprovante_url?: string | null
          created_at?: string
          data_liberacao?: string | null
          data_pagamento?: string | null
          id?: string
          meio_pagamento?: string
          mercadopago_payment_id?: string | null
          mercadopago_preference_id?: string | null
          servico_id?: string
          status?: string
          tecnico_id?: string
          updated_at?: string
          valor_total?: number
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          ativo: boolean
          created_at: string
          email: string
          id: string
          nome: string
          tipo_usuario: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          email: string
          id?: string
          nome: string
          tipo_usuario: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          email?: string
          id?: string
          nome?: string
          tipo_usuario?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
