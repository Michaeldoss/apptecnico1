
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-standard max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-primary mb-4 font-inter">
              Termos de Serviço
            </h1>
            <p className="text-lg text-gray-secondary font-inter">
              Última atualização: 25 de junho de 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  1. Aceitação dos Termos
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Ao acessar e usar o AssistAnywhere, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concorda com qualquer parte destes termos, então você não pode acessar o serviço.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  2. Descrição do Serviço
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  O AssistAnywhere é uma plataforma que conecta clientes a técnicos especializados para serviços de manutenção e reparo de equipamentos eletrônicos. Facilitamos a conexão entre as partes, mas não prestamos diretamente os serviços técnicos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  3. Cadastro e Contas de Usuário
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed mb-4">
                  Para usar nossos serviços, você deve:
                </p>
                <ul className="list-disc list-inside text-gray-primary font-inter space-y-2">
                  <li>Fornecer informações precisas e completas durante o cadastro</li>
                  <li>Manter suas informações atualizadas</li>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Ser responsável por todas as atividades em sua conta</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  4. Responsabilidades dos Usuários
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed mb-4">
                  Os usuários se comprometem a:
                </p>
                <ul className="list-disc list-inside text-gray-primary font-inter space-y-2">
                  <li>Usar a plataforma de forma legal e apropriada</li>
                  <li>Não interferir no funcionamento do serviço</li>
                  <li>Respeitar os direitos de outros usuários</li>
                  <li>Fornecer informações verdadeiras sobre serviços solicitados</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  5. Pagamentos e Cancelamentos
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Os pagamentos são processados através de nossa plataforma segura. Políticas de cancelamento variam dependendo do tipo de serviço e timing. Reembolsos são processados de acordo com nossa política de reembolso disponível em nossa Central de Ajuda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  6. Limitação de Responsabilidade
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  O AssistAnywhere atua como intermediário entre clientes e técnicos. Não nos responsabilizamos pela qualidade dos serviços prestados pelos técnicos parceiros, embora realizemos verificações e mantenhamos um sistema de avaliações.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  7. Modificações dos Termos
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma. O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  8. Contato
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco através do email: legal@assistanywhere.com ou pela nossa página de suporte.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
