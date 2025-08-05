
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, Contact as ContactIcon, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    // Aqui você adicionaria a lógica de envio do formulário
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header com gradiente Instalei */}
      <div className="bg-gradient-to-br from-instalei-purple-500 via-instalei-purple-600 to-instalei-purple-700 pt-24 pb-instalei-xl">
        <div className="container-instalei">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-instalei-md font-inter">
              Entre em Contato com a Instalei
            </h1>
            <p className="text-xl text-instalei-gray-200 max-w-3xl mx-auto font-inter">
              Estamos aqui para ajudar você. Entre em contato conosco através dos canais abaixo ou envie uma mensagem.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-background section-padding">
        <div className="container-instalei">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-instalei-md mb-instalei-2xl">
            <Card className="card-instalei text-center group">
              <CardHeader>
                <Mail className="h-12 w-12 icon-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                <CardTitle className="text-lg font-semibold text-primary font-inter">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 font-inter">contato@instalei.com</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Enviar Email
                </Button>
              </CardContent>
            </Card>

            <Card className="card-instalei text-center group">
              <CardHeader>
                <Phone className="h-12 w-12 icon-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                <CardTitle className="text-lg font-semibold text-primary font-inter">Telefone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 font-inter">(11) 4002-8922</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="card-instalei text-center group">
              <CardHeader>
                <MapPin className="h-12 w-12 icon-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                <CardTitle className="text-lg font-semibold text-primary font-inter">Endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 font-inter">São Paulo, SP<br />Brasil</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Ver Mapa
                </Button>
              </CardContent>
            </Card>

            <Card className="card-instalei text-center group">
              <CardHeader>
                <Clock className="h-12 w-12 icon-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                <CardTitle className="text-lg font-semibold text-primary font-inter">Horário</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 font-inter">Seg - Sex: 8h às 18h<br />Sáb: 8h às 12h</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          </div>

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
