# Segurança - Edge Function criar-pagamento

## Token MercadoPago - Gestão de Segurança

### Rotação de Token
**Frequência Recomendada:** Trimestral (a cada 3 meses)

**Procedimento:**
1. Acesse o dashboard do MercadoPago
2. Gere um novo access token em Credenciais > Access Token
3. Atualize o secret `MERCADOPAGO_ACCESS_TOKEN` no Supabase:
   - Dashboard > Project Settings > Edge Functions > Secrets
4. Teste a integração em ambiente de staging
5. Revogue o token antigo no MercadoPago
6. Documente a rotação no log de auditoria

### Monitoramento
- Logs de uso do token são registrados via `log_security_event`
- Alertas configurados para:
  - Mais de 50 pagamentos/hora (possível abuso)
  - Falhas consecutivas de API (> 5)
  - Tentativas de acesso de IPs não autorizados

### Separação de Permissões
- Token atual: Permissões completas (criar preferences, processar webhooks)
- **Recomendação futura:** Criar tokens separados:
  - Token A: Apenas criar preferences
  - Token B: Apenas ler status de pagamentos

### Auditoria
- Todos os acessos ao token são logados em `security_audit_log`
- Revisão mensal dos logs de uso
- Alertas automáticos para padrões suspeitos

### Contato de Emergência
Em caso de comprometimento do token:
1. Revogue imediatamente no dashboard MercadoPago
2. Gere novo token
3. Atualize o secret no Supabase
4. Notifique a equipe de segurança
5. Revise logs das últimas 24h para transações suspeitas

### Documentação Relacionada
- [MercadoPago Security Best Practices](https://www.mercadopago.com.br/developers/pt/docs/security)
- [Supabase Edge Functions Secrets](https://supabase.com/docs/guides/functions/secrets)
