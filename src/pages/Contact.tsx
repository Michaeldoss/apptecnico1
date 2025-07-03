
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
    <div className="min-h-screen flex flex-col bg-blue-600">
      <Navbar />
      
      {/* Blue header bar */}
      <div className="bg-blue-600 pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6 font-inter">
              Entre em Contato
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto font-inter">
              Estamos aqui para ajudar você. Entre em contato conosco através dos canais abaixo ou envie uma mensagem.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-16">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center hover:shadow-lg transition-all duration-200 border-2 hover:border-tech-primary/20">
              <CardHeader>
                <Mail className="h-12 w-12 text-tech-primary mx-auto mb-4" />
                <CardTitle className="text-lg font-semibold text-tech-primary font-inter">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-secondary mb-4 font-inter">contato@atendaja.com</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Enviar Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 border-2 hover:border-tech-primary/20">
              <CardHeader>
                <Phone className="h-12 w-12 text-tech-primary mx-auto mb-4" />
                <CardTitle className="text-lg font-semibold text-tech-primary font-inter">Telefone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-secondary mb-4 font-inter">(11) 4002-8922</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 border-2 hover:border-tech-primary/20">
              <CardHeader>
                <MapPin className="h-12 w-12 text-tech-primary mx-auto mb-4" />
                <CardTitle className="text-lg font-semibold text-tech-primary font-inter">Endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-secondary mb-4 font-inter">São Paulo, SP<br />Brasil</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Ver Mapa
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 border-2 hover:border-tech-primary/20">
              <CardHeader>
                <Clock className="h-12 w-12 text-tech-primary mx-auto mb-4" />
                <CardTitle className="text-lg font-semibold text-tech-primary font-inter">Horário</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-secondary mb-4 font-inter">Seg - Sex: 8h às 18h<br />Sáb: 8h às 12h</p>
                <Button variant="outline" size="sm" className="font-inter">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-tech-primary mb-4 font-inter">
                  Envie sua Mensagem
                </CardTitle>
                <p className="text-gray-secondary font-inter">
                  Preencha o formulário abaixo e entraremos em contato em breve.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        Nome Completo
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="font-inter"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        E-mail
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="font-inter"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Assunto da sua mensagem"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="font-inter"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Descreva sua dúvida ou solicitação..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="font-inter"
                      required
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-tech-primary hover:bg-tech-primary/90 text-white font-semibold py-3 px-8 transition-all duration-200 hover:shadow-lg font-inter"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-tech-primary font-inter">
                  Perguntas Frequentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-tech-primary mb-3 font-inter">Para Clientes</h3>
                    <ul className="space-y-2 text-gray-primary font-inter">
                      <li>• Como agendar um serviço técnico?</li>
                      <li>• Quais são as formas de pagamento?</li>
                      <li>• Como acompanhar meu chamado?</li>
                      <li>• Qual o prazo para atendimento?</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tech-primary mb-3 font-inter">Para Técnicos</h3>
                    <ul className="space-y-2 text-gray-primary font-inter">
                      <li>• Como me cadastrar na plataforma?</li>
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
