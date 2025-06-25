
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-standard max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-primary mb-4 font-inter">
              Política de Cookies
            </h1>
            <p className="text-lg text-gray-secondary font-inter">
              Última atualização: 25 de junho de 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  1. O que são Cookies
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita nosso website. Eles nos ajudam a melhorar sua experiência de navegação, lembrar suas preferências e fornecer funcionalidades personalizadas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  2. Tipos de Cookies que Utilizamos
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-tech-primary mb-2 font-inter">Cookies Essenciais</h3>
                    <p className="text-gray-primary font-inter leading-relaxed">
                      Necessários para o funcionamento básico do site, incluindo login, navegação e segurança.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-tech-primary mb-2 font-inter">Cookies de Desempenho</h3>
                    <p className="text-gray-primary font-inter leading-relaxed">
                      Coletam informações sobre como você usa nosso site para nos ajudar a melhorar sua funcionalidade.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-tech-primary mb-2 font-inter">Cookies de Funcionalidade</h3>
                    <p className="text-gray-primary font-inter leading-relaxed">
                      Permitem que o site lembre suas escolhas e forneça recursos aprimorados e personalizados.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-tech-primary mb-2 font-inter">Cookies de Marketing</h3>
                    <p className="text-gray-primary font-inter leading-relaxed">
                      Utilizados para rastrear visitantes em websites para exibir anúncios relevantes e envolventes.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  3. Como Usamos os Cookies
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed mb-4">
                  Utilizamos cookies para:
                </p>
                <ul className="list-disc list-inside text-gray-primary font-inter space-y-2">
                  <li>Manter você logado durante sua sessão</li>
                  <li>Lembrar suas preferências e configurações</li>
                  <li>Melhorar a velocidade e segurança do site</li>
                  <li>Analisar como nosso site é usado</li>
                  <li>Personalizar conteúdo e anúncios</li>
                  <li>Fornecer recursos de mídia social</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  4. Cookies de Terceiros
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Também utilizamos serviços de terceiros que podem definir cookies em seu dispositivo, incluindo Google Analytics para análise de tráfego, provedores de pagamento para processar transações e plataformas de mídia social para integração de conteúdo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  5. Controle de Cookies
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed mb-4">
                  Você pode controlar e gerenciar cookies de várias maneiras:
                </p>
                <ul className="list-disc list-inside text-gray-primary font-inter space-y-2">
                  <li>Configurações do navegador para bloquear ou deletar cookies</li>
                  <li>Ferramentas de opt-out de terceiros</li>
                  <li>Nossas preferências de cookies (quando disponível)</li>
                </ul>
                <p className="text-gray-primary font-inter leading-relaxed mt-4">
                  Note que desabilitar cookies pode afetar a funcionalidade do nosso site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  6. Atualizações desta Política
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Podemos atualizar esta política de cookies periodicamente para refletir mudanças em nossas práticas ou por razões operacionais, legais ou regulamentares. Recomendamos que você revise esta página regularmente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                  7. Contato
                </h2>
                <p className="text-gray-primary font-inter leading-relaxed">
                  Se você tiver dúvidas sobre nossa política de cookies, entre em contato conosco:
                </p>
                <div className="mt-4 p-4 bg-gray-light rounded-lg">
                  <p className="text-gray-primary font-inter">
                    <strong>Email:</strong> cookies@assistanywhere.com<br />
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

export default Cookies;
