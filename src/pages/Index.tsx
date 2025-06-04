
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Clock, ArrowUp, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: "Bots IA Conversacionales",
      description: "Automatiza ventas con IA en WhatsApp e Instagram DM"
    },
    {
      icon: Users,
      title: "Gestión de Clientes",
      description: "Administra múltiples ecommerce desde una plataforma"
    },
    {
      icon: Clock,
      title: "Atención 24/7",
      description: "Tus bots trabajan sin descanso para maximizar ventas"
    }
  ];

  const stats = [
    { value: "500+", label: "Pedidos Procesados" },
    { value: "50+", label: "Clientes Activos" },
    { value: "95%", label: "Satisfacción" },
    { value: "24/7", label: "Disponibilidad" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">
            EcommerceBot AI
          </div>
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              className="hover:bg-white/20"
            >
              Dashboard
            </Button>
            <Button 
              className="btn-primary"
              onClick={() => navigate("/admin")}
            >
              Admin Panel
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Automatiza tu Ecommerce
            <br />
            con Bots IA
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma SaaS que permite a tus clientes vender automáticamente por WhatsApp e Instagram 
            usando inteligencia artificial conversacional.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-primary text-lg px-8 py-4"
              onClick={() => navigate("/dashboard")}
            >
              Probar Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-2 hover:bg-white/20"
              onClick={() => navigate("/admin")}
            >
              Ver Admin Panel
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-in">
          {stats.map((stat, index) => (
            <Card key={index} className="stat-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Funcionalidades Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar una plataforma de bots de ecommerce
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-slide-in">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="glassmorphism border-white/30 max-w-4xl mx-auto animate-fade-in">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              ¿Listo para empezar?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Explora el dashboard completo y descubre cómo tu plataforma SaaS 
              puede transformar las ventas por mensajería de tus clientes.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-primary"
                onClick={() => navigate("/dashboard")}
              >
                Explorar Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2"
                onClick={() => navigate("/admin")}
              >
                Panel Administrativo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-white/20">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 EcommerceBot AI. Plataforma SaaS para automatización de ventas.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
