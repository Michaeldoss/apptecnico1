
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-standard">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-primary mb-4 font-inter">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-secondary max-w-3xl mx-auto font-inter">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="card-standard border-none shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium text-tech-primary hover:text-tech-primary-hover font-inter">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-primary font-inter">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-secondary mb-4 font-inter">
              Não encontrou a resposta que procurava?
            </p>
            <Link
              to="/support"
              className="text-tech-primary hover:text-tech-primary-hover font-medium font-inter link-underline"
            >
              Entre em contato conosco
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
