
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "Como posso solicitar um serviço técnico?",
      answer: "Você pode solicitar um serviço através da nossa plataforma fazendo login na sua conta e clicando em 'Solicitar Serviço'. Preencha os detalhes do problema e um técnico qualificado será designado para atendê-lo."
    },
    {
      question: "Quanto tempo leva para um técnico chegar?",
      answer: "O tempo de resposta varia de acordo com a localização e disponibilidade dos técnicos. Geralmente, conseguimos agendar um atendimento dentro de 24 horas para casos não urgentes e em algumas horas para emergências."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "Aceitamos diversos métodos de pagamento incluindo cartão de crédito, débito, PIX e boleto bancário. O pagamento é processado de forma segura através da nossa plataforma criptografada."
    },
    {
      question: "Posso acompanhar o status do meu chamado?",
      answer: "Sim! Você pode acompanhar o status do seu chamado em tempo real através da página de rastreamento, usando o código fornecido no momento da solicitação."
    },
    {
      question: "Os técnicos são verificados?",
      answer: "Todos os nossos técnicos passam por um processo rigoroso de verificação, incluindo checagem de antecedentes, validação de certificações e avaliação de competências técnicas."
    },
    {
      question: "E se eu não ficar satisfeito com o serviço?",
      answer: "Sua satisfação é nossa prioridade. Se você não ficar satisfeito com o serviço, oferecemos garantia de retrabalho ou reembolso, dependendo da situação. Entre em contato conosco para resolver qualquer problema."
    },
    {
      question: "Como me tornar um técnico parceiro?",
      answer: "Para se tornar um técnico parceiro, acesse a página 'Seja um Técnico', preencha o formulário de cadastro com suas qualificações e aguarde nossa análise. O processo de aprovação leva em média 3-5 dias úteis."
    },
    {
      question: "Vocês atendem em que regiões?",
      answer: "Atualmente atendemos nas principais cidades do Brasil. Estamos expandindo nossa rede de técnicos constantemente. Verifique a disponibilidade na sua região através da nossa ferramenta de busca."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container-standard text-center">
          <div className="max-w-4xl mx-auto">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-5xl font-bold mb-6 font-inter">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-blue-100 font-inter max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços e plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-standard">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="card-standard animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 font-inter text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 font-inter text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-standard">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
              Não encontrou sua resposta?
            </h2>
            <p className="text-gray-600 font-inter text-lg max-w-2xl mx-auto">
              Nossa equipe de suporte está sempre pronta para ajudar você com qualquer dúvida adicional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-standard text-center hover-scale">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Chat Online</h3>
              <p className="text-gray-600 mb-4 font-inter">Fale conosco em tempo real</p>
              <Link to="/support">
                <Button className="btn-primary">
                  Iniciar Chat
                </Button>
              </Link>
            </div>

            <div className="card-standard text-center hover-scale">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Telefone</h3>
              <p className="text-gray-600 mb-4 font-inter">(11) 9999-9999</p>
              <Button className="btn-outline">
                Ligar Agora
              </Button>
            </div>

            <div className="card-standard text-center hover-scale">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Email</h3>
              <p className="text-gray-600 mb-4 font-inter">suporte@instalei.com</p>
              <Link to="/contact">
                <Button className="btn-secondary">
                  Enviar Email
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
