import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'comercial@dossgroup.com.br',
    action: {
      label: 'Enviar Email',
      href: 'mailto:comercial@dossgroup.com.br',
    },
  },
  {
    icon: Phone,
    title: 'Telefone',
    content: ['(47) 99230-7367', '(47) 3032-1234'],
    action: {
      label: 'Ligar Agora',
      href: 'tel:+5547992307367',
    },
  },
  {
    icon: MapPin,
    title: 'Endereço',
    content: ['Rua Victor Konder, 208', 'Comasa - Joinville/SC', 'CEP: 89227-240'],
    action: {
      label: 'Ver Mapa',
      href: 'https://maps.google.com/?q=Rua+Victor+Konder+208+Comasa+Joinville+SC',
      external: true,
    },
  },
  {
    icon: Clock,
    title: 'Horário',
    content: 'Atendimento 24 horas',
    highlight: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary text-white py-20">
        <div className="container-instalei">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Entre em Contato
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Estamos aqui para ajudar você. Entre em contato conosco através dos canais abaixo.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="flex-1 bg-background section-padding">
        <div className="container-instalei">
          {/* Contact Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {info.title}
                      </h3>
                      
                      <div className="flex-1 flex flex-col items-center justify-center mb-4">
                        {Array.isArray(info.content) ? (
                          info.content.map((line, i) => (
                            <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                              {line}
                            </p>
                          ))
                        ) : (
                          <p className={`text-sm leading-relaxed ${info.highlight ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                            {info.content}
                          </p>
                        )}
                      </div>
                      
                      {info.action && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-auto hover:bg-primary hover:text-primary-foreground transition-colors"
                          asChild
                        >
                          <a 
                            href={info.action.href}
                            {...(info.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {info.action.label}
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="card-instalei p-instalei-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary mb-instalei-md font-inter">
                  Envie sua Mensagem para a Instalei
                </CardTitle>
                <p className="text-muted-foreground font-inter">
                  Preencha o formulário abaixo e entraremos em contato em breve.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-instalei-md">
                  <div className="grid md:grid-cols-2 gap-instalei-md">
                    <div>
                      <label htmlFor="name" className="block font-medium text-primary mb-instalei-xs font-inter">
                        Nome Completo
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="font-inter border-2 focus:border-accent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-medium text-primary mb-instalei-xs font-inter">
                        E-mail
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="font-inter border-2 focus:border-accent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block font-medium text-primary mb-instalei-xs font-inter">
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Assunto da sua mensagem"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="font-inter border-2 focus:border-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-medium text-primary mb-instalei-xs font-inter">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Descreva sua dúvida ou solicitação..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="font-inter border-2 focus:border-accent"
                      required
                    />
                  </div>
                  
                  <div className="text-center pt-instalei-md">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="btn-primary font-inter"
                    >
                      <Send className="h-5 w-5 mr-2 icon-white" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-instalei-2xl">
            <Card className="card-instalei">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary font-inter">
                  Perguntas Frequentes sobre a Instalei
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-instalei-lg">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-instalei-sm font-inter">Para Clientes</h3>
                    <ul className="space-y-2 text-foreground font-inter">
                      <li>• Como agendar um serviço técnico na Instalei?</li>
                      <li>• Quais são as formas de pagamento aceitas?</li>
                      <li>• Como acompanhar meu chamado?</li>
                      <li>• Qual o prazo para atendimento?</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-instalei-sm font-inter">Para Técnicos</h3>
                    <ul className="space-y-2 text-foreground font-inter">
                      <li>• Como me cadastrar na plataforma Instalei?</li>
                      <li>• Como recebo os pagamentos?</li>
                      <li>• Posso escolher meus horários?</li>
                      <li>• Qual equipamento preciso ter?</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
