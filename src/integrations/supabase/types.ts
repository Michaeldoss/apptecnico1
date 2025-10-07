export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          ativo: boolean | null
          created_at: string
          email: string
          foto_perfil_url: string | null
          id: string
          nome: string
          perfil_completo: boolean | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string
          email: string
          foto_perfil_url?: string | null
          id?: string
          nome: string
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string
          email?: string
          foto_perfil_url?: string | null
          id?: string
          nome?: string
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
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
      clientes: {
        Row: {
          ativo: boolean | null
          bairro: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          cpf_cnpj: string | null
          created_at: string
          dados_bancarios: Json | null
          documentos_url: Json | null
          email: string
          endereco: string | null
          estado: string | null
          foto_perfil_url: string | null
          id: string
          nome: string
          nota_perfil: number | null
          numero: string | null
          perfil_completo: boolean | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          dados_bancarios?: Json | null
          documentos_url?: Json | null
          email: string
          endereco?: string | null
          estado?: string | null
          foto_perfil_url?: string | null
          id?: string
          nome: string
          nota_perfil?: number | null
          numero?: string | null
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          dados_bancarios?: Json | null
          documentos_url?: Json | null
          email?: string
          endereco?: string | null
          estado?: string | null
          foto_perfil_url?: string | null
          id?: string
          nome?: string
          nota_perfil?: number | null
          numero?: string | null
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      lojas: {
        Row: {
          ativo: boolean | null
          bairro: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          complemento: string | null
          created_at: string
          dados_bancarios: Json | null
          descricao: string | null
          documentos_url: Json | null
          email: string
          endereco: string | null
          estado: string | null
          id: string
          logo_url: string | null
          nome_contato: string
          nome_empresa: string
          nota_perfil: number | null
          numero: string | null
          perfil_completo: boolean | null
          telefone: string | null
          updated_at: string
          verificado: boolean | null
        }
        Insert: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          created_at?: string
          dados_bancarios?: Json | null
          descricao?: string | null
          documentos_url?: Json | null
          email: string
          endereco?: string | null
          estado?: string | null
          id?: string
          logo_url?: string | null
          nome_contato: string
          nome_empresa: string
          nota_perfil?: number | null
          numero?: string | null
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
          verificado?: boolean | null
        }
        Update: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          created_at?: string
          dados_bancarios?: Json | null
          descricao?: string | null
          documentos_url?: Json | null
          email?: string
          endereco?: string | null
          estado?: string | null
          id?: string
          logo_url?: string | null
          nome_contato?: string
          nome_empresa?: string
          nota_perfil?: number | null
          numero?: string | null
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
          verificado?: boolean | null
        }
        Relationships: []
      }
      ordens_servico: {
        Row: {
          avaliacao: number | null
          categoria: string | null
          cliente_id: string | null
          comentario_avaliacao: string | null
          created_at: string
          data_agendada: string | null
          data_conclusao: string | null
          descricao: string | null
          endereco_servico: string | null
          id: string
          prioridade: string | null
          status: string | null
          tecnico_id: string | null
          titulo: string
          updated_at: string
          valor_pecas: number | null
          valor_servico: number | null
          valor_total: number | null
        }
        Insert: {
          avaliacao?: number | null
          categoria?: string | null
          cliente_id?: string | null
          comentario_avaliacao?: string | null
          created_at?: string
          data_agendada?: string | null
          data_conclusao?: string | null
          descricao?: string | null
          endereco_servico?: string | null
          id?: string
          prioridade?: string | null
          status?: string | null
          tecnico_id?: string | null
          titulo: string
          updated_at?: string
          valor_pecas?: number | null
          valor_servico?: number | null
          valor_total?: number | null
        }
        Update: {
          avaliacao?: number | null
          categoria?: string | null
          cliente_id?: string | null
          comentario_avaliacao?: string | null
          created_at?: string
          data_agendada?: string | null
          data_conclusao?: string | null
          descricao?: string | null
          endereco_servico?: string | null
          id?: string
          prioridade?: string | null
          status?: string | null
          tecnico_id?: string | null
          titulo?: string
          updated_at?: string
          valor_pecas?: number | null
          valor_servico?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ordens_servico_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordens_servico_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      pecas: {
        Row: {
          ativo: boolean | null
          categoria: string | null
          compatibilidade: string[] | null
          created_at: string
          descricao: string | null
          estoque: number | null
          id: string
          marca: string | null
          modelo: string | null
          nome: string
          preco: number
          tecnico_id: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          categoria?: string | null
          compatibilidade?: string[] | null
          created_at?: string
          descricao?: string | null
          estoque?: number | null
          id?: string
          marca?: string | null
          modelo?: string | null
          nome: string
          preco: number
          tecnico_id?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          categoria?: string | null
          compatibilidade?: string[] | null
          created_at?: string
          descricao?: string | null
          estoque?: number | null
          id?: string
          marca?: string | null
          modelo?: string | null
          nome?: string
          preco?: number
          tecnico_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pecas_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      planos: {
        Row: {
          ativo: boolean | null
          caracteristicas: Json | null
          created_at: string
          descricao: string | null
          id: string
          limite_servicos: number | null
          limite_usuarios: number | null
          nome: string
          preco_anual: number | null
          preco_mensal: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          caracteristicas?: Json | null
          created_at?: string
          descricao?: string | null
          id?: string
          limite_servicos?: number | null
          limite_usuarios?: number | null
          nome: string
          preco_anual?: number | null
          preco_mensal: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          caracteristicas?: Json | null
          created_at?: string
          descricao?: string | null
          id?: string
          limite_servicos?: number | null
          limite_usuarios?: number | null
          nome?: string
          preco_anual?: number | null
          preco_mensal?: number
          updated_at?: string
        }
        Relationships: []
      }
      planos_contratados: {
        Row: {
          created_at: string
          data_fim: string | null
          data_inicio: string
          forma_pagamento: string | null
          id: string
          plano_id: string | null
          status: string | null
          updated_at: string
          usuario_id: string
          usuario_tipo: string
          valor_pago: number | null
        }
        Insert: {
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          forma_pagamento?: string | null
          id?: string
          plano_id?: string | null
          status?: string | null
          updated_at?: string
          usuario_id: string
          usuario_tipo: string
          valor_pago?: number | null
        }
        Update: {
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          forma_pagamento?: string | null
          id?: string
          plano_id?: string | null
          status?: string | null
          updated_at?: string
          usuario_id?: string
          usuario_tipo?: string
          valor_pago?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "planos_contratados_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
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
      produtos: {
        Row: {
          ativo: boolean | null
          categoria: string | null
          created_at: string
          descricao: string | null
          estoque: number | null
          id: string
          imagens_url: Json | null
          loja_id: string | null
          marca: string | null
          modelo: string | null
          nome: string
          preco: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          estoque?: number | null
          id?: string
          imagens_url?: Json | null
          loja_id?: string | null
          marca?: string | null
          modelo?: string | null
          nome: string
          preco: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          estoque?: number | null
          id?: string
          imagens_url?: Json | null
          loja_id?: string | null
          marca?: string | null
          modelo?: string | null
          nome?: string
          preco?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtos_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtos_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas_public"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action_type: string
          attempt_count: number | null
          blocked_until: string | null
          created_at: string | null
          first_attempt: string | null
          id: string
          identifier: string
          last_attempt: string | null
          updated_at: string | null
        }
        Insert: {
          action_type: string
          attempt_count?: number | null
          blocked_until?: string | null
          created_at?: string | null
          first_attempt?: string | null
          id?: string
          identifier: string
          last_attempt?: string | null
          updated_at?: string | null
        }
        Update: {
          action_type?: string
          attempt_count?: number | null
          blocked_until?: string | null
          created_at?: string | null
          first_attempt?: string | null
          id?: string
          identifier?: string
          last_attempt?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      servicos_agendados: {
        Row: {
          cliente_id: string | null
          created_at: string
          data_agendamento: string
          data_fim: string | null
          data_inicio: string | null
          id: string
          observacoes: string | null
          ordem_servico_id: string | null
          status: string | null
          tecnico_id: string | null
          updated_at: string
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          data_agendamento: string
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          observacoes?: string | null
          ordem_servico_id?: string | null
          status?: string | null
          tecnico_id?: string | null
          updated_at?: string
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          data_agendamento?: string
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          observacoes?: string | null
          ordem_servico_id?: string | null
          status?: string | null
          tecnico_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "servicos_agendados_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "servicos_agendados_ordem_servico_id_fkey"
            columns: ["ordem_servico_id"]
            isOneToOne: false
            referencedRelation: "ordens_servico"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "servicos_agendados_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
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
      tecnicos: {
        Row: {
          ativo: boolean | null
          bairro: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          cpf_cnpj: string | null
          created_at: string
          dados_bancarios: Json | null
          documentos_url: Json | null
          email: string
          endereco: string | null
          especialidades: string[] | null
          estado: string | null
          experiencia_anos: number | null
          foto_perfil_url: string | null
          id: string
          latitude: number | null
          longitude: number | null
          nome: string
          nota_perfil: number | null
          numero: string | null
          perfil_completo: boolean | null
          telefone: string | null
          updated_at: string
          verificado: boolean | null
        }
        Insert: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          dados_bancarios?: Json | null
          documentos_url?: Json | null
          email: string
          endereco?: string | null
          especialidades?: string[] | null
          estado?: string | null
          experiencia_anos?: number | null
          foto_perfil_url?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome: string
          nota_perfil?: number | null
          numero?: string | null
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
          verificado?: boolean | null
        }
        Update: {
          ativo?: boolean | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          dados_bancarios?: Json | null
          documentos_url?: Json | null
          email?: string
          endereco?: string | null
          especialidades?: string[] | null
          estado?: string | null
          experiencia_anos?: number | null
          foto_perfil_url?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome?: string
          nota_perfil?: number | null
          numero?: string | null
          perfil_completo?: boolean | null
          telefone?: string | null
          updated_at?: string
          verificado?: boolean | null
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
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      lojas_public: {
        Row: {
          ativo: boolean | null
          cidade: string | null
          created_at: string | null
          estado: string | null
          id: string | null
          logo_url: string | null
          nome_empresa: string | null
          verificado: boolean | null
        }
        Insert: {
          ativo?: boolean | null
          cidade?: string | null
          created_at?: string | null
          estado?: string | null
          id?: string | null
          logo_url?: string | null
          nome_empresa?: string | null
          verificado?: boolean | null
        }
        Update: {
          ativo?: boolean | null
          cidade?: string | null
          created_at?: string | null
          estado?: string | null
          id?: string | null
          logo_url?: string | null
          nome_empresa?: string | null
          verificado?: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_action_type: string
          p_block_minutes?: number
          p_identifier: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      create_user_profile: {
        Args: { p_user_data: Json; p_user_type: string }
        Returns: Json
      }
      debug_auth_state: {
        Args: Record<PropertyKey, never>
        Returns: {
          auth_confirmed: boolean
          auth_user_email: string
          auth_user_id: string
          user_in_usuarios: boolean
          usuarios_count: number
        }[]
      }
      get_current_user_type: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_security_event: {
        Args: { details?: Json; event_type: string; user_id?: string }
        Returns: undefined
      }
      secure_user_registration: {
        Args: {
          p_email: string
          p_password: string
          p_user_data: Json
          p_user_type: string
        }
        Returns: Json
      }
      validate_password_security: {
        Args: { password: string }
        Returns: boolean
      }
      validate_payment_amount: {
        Args: { amount: number }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
