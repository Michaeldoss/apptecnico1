
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-standard max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-primary mb-4 font-inter">
              Política de Privacidade
            </h1>
            <p className="text-lg text-gray-secondary font-inter">
              Última atualização: 25 de junho de 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  1. Informações que Coletamos
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed mb-4">
                  Coletamos informações que você nos fornece diretamente, como:
                </p>
                <ul className="list-disc list-inside text-gray-primary font-inter space-y-2">
                  <li>Informações de cadastro (nome, email, telefone, endereço)</li>
                  <li>Informações de pagamento (processadas por terceiros seguros)</li>
                  <li>Descrições de problemas técnicos e serviços solicitados</li>
                  <li>Comunicações conosco (chat, email, telefone)</li>
                  <li>Avaliações e feedback sobre serviços</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  2. Como Usamos suas Informações
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed mb-4">
                  Usamos suas informações para:
                </p>
                <ul className="list-disc list-inside text-gray-primary font-inter space-y-2">
                  <li>Conectar você com técnicos qualificados</li>
                  <li>Processar pagamentos e fornecer recibos</li>
                  <li>Enviar atualizações sobre seus serviços</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  3. Compartilhamento de Informações
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Compartilhamos suas informações apenas quando necessário para fornecer nossos serviços, com técnicos parceiros para execução dos trabalhos, processadores de pagamento para transações financeiras, e quando exigido por lei. Nunca vendemos suas informações pessoais para terceiros.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  4. Segurança dos Dados
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia SSL, armazenamento seguro de dados e controles de acesso rigorosos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  5. Seus Direitos
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed mb-4">
                  Você tem o direito de:
                </p>
                <ul className="list-disc list-inside text-gray-primary font-inter space-y-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações imprecisas</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Restringir o processamento de suas informações</li>
                  <li>Portabilidade de dados</li>
                  <li>Retirar consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  6. Cookies e Tecnologias Similares
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Usamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso de nossos serviços e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  7. Retenção de Dados
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, atender requisitos legais, resolver disputas e fazer cumprir nossos acordos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  8. Alterações nesta Política
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças significativas por email ou através de nossa plataforma. O uso continuado de nossos serviços após as alterações constitui aceitação da política atualizada.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  9. Contato
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Para questões sobre esta Política de Privacidade ou para exercer seus direitos de proteção de dados, entre em contato conosco:
                </p>
                <div className="mt-4 p-4 bg-gray-light rounded-lg">
                  <p className="text-gray-primary font-inter">
                    <strong>Email:</strong> privacidade@assistanywhere.com<br />
                    <strong>Telefone:</strong> (11) 9999-9999<br />
                    <strong>Endereço:</strong> São Paulo, SP - Brasil
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
