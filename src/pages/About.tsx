
import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "🎯 Missão",
      description: "Conectar clientes e técnicos especializados em instalação e manutenção de forma eficiente, segura e inteligente, elevando o padrão de confiança e profissionalismo no setor técnico brasileiro."
    },
    {
      icon: Heart,
      title: "💙 Valores",
      description: "Confiança, qualidade e transparência em cada serviço. Valorizamos o trabalho técnico, a ética nas relações e a inovação que simplifica a vida das pessoas. Nosso compromisso é fazer cada conexão gerar resultado, reconhecimento e evolução."
    },
    {
      icon: Award,
      title: "🏆 Visão",
      description: "Ser a plataforma líder e referência nacional em serviços técnicos, revolucionando a forma como clientes e profissionais se conectam, e tornando o atendimento mais humano, rápido e confiável em todo o Brasil."
    }
  ];

  const team = [
    {
      name: "Lucas Mendes",
      role: "CEO & Fundador",
      description: "Engenheiro com 12 anos de experiência em tecnologia e gestão de plataformas digitais",
      gradient: "from-primary to-primary-dark"
    },
    {
      name: "Ana Carolina",
      role: "CTO",
      description: "Especialista em desenvolvimento de aplicações mobile e sistemas de matching",
      gradient: "from-primary to-accent"
    },
    {
      name: "Roberto Silva",
      role: "Head de Operações",
      description: "Especialista em logística e gestão de redes de prestadores de serviços técnicos",
      gradient: "from-accent to-primary"
    }
  ];

  const achievements = [
    "Mais de 5.000 técnicos cadastrados",
    "25.000+ instalações realizadas", 
    "Presença em 150+ cidades",
    "98% de satisfação dos clientes"
  ];

  return (
    <PublicLayout 
      title="Sobre a Instalei" 
      subtitle="Conectando você aos melhores técnicos especializados em instalação e manutenção"
      showHeader={true}
    >
      {/* Floating Action Button */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="text-center mb-12">
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
              Entre em Contato
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Nossa História
              </h2>
              <div className="text-lg text-muted-foreground space-y-6 leading-relaxed text-left max-w-4xl mx-auto">
                <p>
                  Tudo começou dentro da <strong>Doss Group</strong>, uma empresa que nasceu com o propósito de trazer mais cores para o mundo desde a primeira impressão.
                </p>
                <p>
                  Durante anos, vivemos de perto o dia a dia dos técnicos, revendas e clientes de todo o Brasil — e, com isso, vimos algo se repetir o tempo todo: a dificuldade de conectar quem precisa de manutenção com quem realmente sabe fazer o serviço.
                </p>
                <p>
                  Havia técnicos incríveis, cheios de experiência, mas sem visibilidade.<br />
                  E havia clientes desesperados, com a produção parada, sem saber em quem confiar.<br />
                  Foi aí que percebemos: <strong>o mercado de impressão digital precisava de algo novo.</strong>
                </p>
                <p>
                  Enquanto cuidávamos de máquinas, tintas e equipamentos em todas as regiões do país, a ideia começou a nascer dentro da Doss Group. Não era só sobre resolver um problema técnico — era sobre unir pessoas, facilitar a vida e profissionalizar um setor inteiro.
                </p>
                <p className="font-semibold text-primary text-xl">
                  Assim nasceu a Instalei:
                </p>
                <p>
                  Um aplicativo criado para conectar clientes, técnicos e lojas de forma simples, rápida e segura. Um espaço onde o cliente solicita um serviço e recebe atendimento qualificado, com rastreamento em tempo real, pagamento integrado e avaliações transparentes. Onde o técnico pode mostrar seu trabalho, vender peças, receber pelo que faz e conquistar sua independência. E onde as empresas podem contar com uma rede confiável de profissionais certificados.
                </p>
                <p className="font-semibold">
                  A Instalei é mais do que um app.<br />
                  É um movimento pela confiança e pela eficiência no setor de impressão.
                </p>
                <p>
                  Um projeto que nasceu da prática — de quem vive o chão de fábrica, entende o barulho da máquina e sabe o que é ter um cliente esperando uma entrega que depende de um simples detalhe técnico.
                </p>
                <p>
                  Criamos a Instalei porque acreditamos que quando a tecnologia se une à experiência, todos ganham. Porque o futuro do nosso setor não está apenas nas máquinas, mas nas pessoas que fazem tudo funcionar.
                </p>
                <p>
                  E foi essa visão — de unir o técnico, o cliente e o mercado — que transformou um sonho da Doss Group em realidade.
                </p>
                <p className="text-xl font-bold text-primary text-center mt-8">
                  Instalei. Conectando quem faz acontecer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Nossos Valores
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Os princípios que guiam nossa empresa e nosso compromisso com a excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-card/80 backdrop-blur-sm hover:bg-card">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Nossa Equipe
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Profissionais experientes dedicados a oferecer a melhor experiência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-card/80 backdrop-blur-sm hover:bg-card overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`mx-auto w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-3xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Users className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{member.name}</CardTitle>
                  <CardDescription className="text-accent font-semibold text-lg">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">Nossos Números</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Resultados que demonstram nosso compromisso com a excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-10 w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <p className="text-xl font-bold text-primary-foreground leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Faça Parte da Nossa Comunidade
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Junte-se a milhares de clientes satisfeitos e técnicos qualificados
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform px-8 py-4 text-lg">
                  Cadastre-se como Cliente
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/technician">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform px-8 py-4 text-lg">
                  Seja um Técnico Parceiro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
