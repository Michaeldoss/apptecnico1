
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Scale, Users, FileText, Clock, Mail } from 'lucide-react';

const Terms = () => {
  const lastUpdated = "25 de junho de 2025";

  const sections = [
    {
      icon: FileText,
      title: "1. Aceitação dos Termos",
      content: [
        "Ao acessar e usar a plataforma DGSoluções, você concorda em cumprir e ficar vinculado a estes Termos de Serviço.",
        "Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.",
        "Reservamo-nos o direito de modificar estes termos a qualquer momento, com notificação prévia aos usuários."
      ]
    },
    {
      icon: Users,
      title: "2. Definições e Usuários",
      content: [
        "Cliente: Pessoa física ou jurídica que solicita serviços através da plataforma.",
        "Técnico: Profissional qualificado que presta serviços de manutenção e reparo de equipamentos.",
        "Lojista: Empresa que oferece produtos e peças através da plataforma.",
        "Plataforma: Sistema online DGSoluções que conecta clientes, técnicos e lojistas."
      ]
    },
    {
      icon: Shield,
      title: "3. Cadastro e Conta",
      content: [
        "Para usar nossos serviços, você deve criar uma conta fornecendo informações precisas e atualizadas.",
        "Você é responsável por manter a confidencialidade de sua senha e por todas as atividades em sua conta.",
        "Notifique-nos imediatamente sobre qualquer uso não autorizado de sua conta.",
        "Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos."
      ]
    },
    {
      icon: Scale,
      title: "4. Responsabilidades dos Usuários",
      content: [
        "Clientes devem fornecer informações precisas sobre problemas de equipamentos e permitir acesso adequado aos técnicos.",
        "Técnicos devem possuir qualificações adequadas, fornecer serviços de qualidade e cumprir prazos acordados.",
        "Lojistas devem garantir a qualidade dos produtos oferecidos e cumprir prazos de entrega.",
        "Todos os usuários devem usar a plataforma de forma ética e em conformidade com a legislação aplicável."
      ]
    },
    {
      icon: FileText,
      title: "5. Serviços da Plataforma",
      content: [
        "Conectamos clientes a técnicos qualificados para serviços de manutenção e reparo.",
        "Facilitamos a compra e venda de equipamentos e peças através de lojistas parceiros.",
        "Fornecemos ferramentas de comunicação, agendamento e pagamento.",
        "Não garantimos a disponibilidade contínua dos serviços e pode haver interrupções para manutenção."
      ]
    },
    {
      icon: Clock,
      title: "6. Pagamentos e Cancelamentos",
      content: [
        "Os pagamentos são processados através de gateways seguros e seguem as condições acordadas entre as partes.",
        "Taxas de cancelamento podem ser aplicadas conforme políticas específicas de cada serviço.",
        "Reembolsos serão processados de acordo com nossa política de reembolso.",
        "A plataforma pode cobrar taxas de transação pelos serviços prestados."
      ]
    },
    {
      icon: Shield,
      title: "7. Limitação de Responsabilidade",
      content: [
        "A DGSoluções atua como intermediária, conectando usuários, mas não é responsável pela qualidade dos serviços prestados.",
        "Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais.",
        "Nossa responsabilidade total não excederá o valor das taxas pagas pelo usuário nos últimos 12 meses.",
        "Usuários devem resolver disputas diretamente ou através dos mecanismos de resolução fornecidos."
      ]
    },
    {
      icon: FileText,
      title: "8. Propriedade Intelectual",
      content: [
        "Todo o conteúdo da plataforma, incluindo textos, gráficos, logos e software, é propriedade da DGSoluções.",
        "Usuários concedem licença para usar o conteúdo que enviam conforme necessário para operar a plataforma.",
        "É proibido copiar, modificar ou distribuir nosso conteúdo sem autorização expressa.",
        "Respeitamos os direitos de propriedade intelectual de terceiros e esperamos que os usuários façam o mesmo."
      ]
    },
    {
      icon: Scale,
      title: "9. Legislação Aplicável",
      content: [
        "Estes termos são regidos pelas leis brasileiras.",
        "Qualquer disputa será resolvida nos tribunais competentes do Brasil.",
        "Em caso de conflito entre versões em diferentes idiomas, a versão em português prevalecerá.",
        "Se alguma cláusula for considerada inválida, as demais permanecerão em vigor."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-light font-inter">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-tech-primary mb-4">
            Termos de Serviço
          </h1>
          <p className="text-lg text-gray-secondary mb-2">
            Condições gerais de uso da plataforma DGSoluções
          </p>
          <p className="text-sm text-gray-secondary">
            Última atualização: {lastUpdated}
          </p>
        </div>

        {/* Introduction Card */}
        <Card className="mb-8 bg-white border-2 border-gray-border shadow-sm">
          <CardHeader className="bg-tech-primary text-white">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <FileText className="h-6 w-6" />
              Bem-vindo aos Termos de Serviço da DGSoluções
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-secondary leading-relaxed">
              Estes Termos de Serviço ("Termos") regem o uso da plataforma DGSoluções, 
              que conecta clientes a técnicos especializados em manutenção de equipamentos 
              gráficos e facilita a compra de peças e equipamentos. Ao usar nossa plataforma, 
              você concorda com estes termos.
            </p>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={index} className="bg-white border-2 border-gray-border shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="bg-gray-light border-b border-gray-border">
                  <CardTitle className="text-xl font-bold text-tech-primary flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-tech-accent" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-secondary leading-relaxed pl-4 relative">
                        <span className="absolute left-0 top-2 w-2 h-2 bg-tech-accent rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Information */}
        <Card className="mt-8 bg-white border-2 border-gray-border shadow-sm">
          <CardHeader className="bg-tech-accent text-white">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <Mail className="h-6 w-6" />
              Contato e Dúvidas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-secondary leading-relaxed">
                Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-tech-primary">Email:</h4>
                  <p className="text-gray-secondary">contato@dgsolucoes.com.br</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-tech-primary">Telefone:</h4>
                  <p className="text-gray-secondary">(11) 9999-9999</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <p className="text-sm text-gray-500">
                Ao continuar a usar nossa plataforma após a publicação de alterações nestes termos, 
                você concorda com os termos revisados. Recomendamos que revise periodicamente esta página.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg border-2 border-gray-border">
          <p className="text-sm text-gray-500">
            © 2025 DGSoluções. Todos os direitos reservados. 
            Este documento foi atualizado em {lastUpdated}.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
