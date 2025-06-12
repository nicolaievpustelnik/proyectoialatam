
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Users, Clock, ArrowUp, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();

  const stats = [
    {
      title: "Pedidos Hoy",
      value: "23",
      change: "+12%",
      icon: Clock,
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      title: "Clientes Activos",
      value: "156",
      change: "+5%",
      icon: Users,
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      title: "Conversaciones Bot",
      value: "342",
      change: "+18%",
      icon: MessageSquare,
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      title: "Conversión",
      value: "8.5%",
      change: "+2.1%",
      icon: ArrowUp,
      gradient: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  const recentOrders = [
    { id: "#1234", customer: "Ana García", product: "Zapatillas Nike", amount: "$120.00", status: "Pendiente" },
    { id: "#1235", customer: "Carlos Ruiz", product: "Camiseta Adidas", amount: "$45.00", status: "Procesando" },
    { id: "#1236", customer: "María López", product: "Mochila Escolar", amount: "$35.00", status: "Enviado" },
    { id: "#1237", customer: "Pedro Sánchez", product: "Reloj Casio", amount: "$89.00", status: "Entregado" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Procesando": return "bg-blue-100 text-blue-800";
      case "Enviado": return "bg-purple-100 text-purple-800";
      case "Entregado": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout 
      title="Dashboard Principal" 
      subtitle="Vista general de tu ecommerce con bots IA"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold gradient-text">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {stat.change} vs ayer
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.gradient}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="card-hover bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Gestiona tu ecommerce con un click
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="btn-primary h-16 flex flex-col gap-2"
                onClick={() => navigate("/products")}
              >
                <Check className="h-5 w-5" />
                Nuevo Producto
              </Button>

              {userProfile?.rol === 'admin' && (
                <Button 
                  variant="outline" 
                  className="h-16 flex flex-col gap-2 border-2"
                  onClick={() => navigate("/companies")}
                >
                  Empresas
                </Button>
              )}

              <Button 
                variant="outline" 
                className="h-16 flex flex-col gap-2 border-2"
                onClick={() => navigate("/orders")}
              >
                <Clock className="h-5 w-5" />
                Ver Pedidos
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col gap-2 border-2"
                onClick={() => navigate("/bot-config")}
              >
                <MessageSquare className="h-5 w-5" />
                Config. Bot
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col gap-2 border-2"
                onClick={() => navigate("/analytics")}
              >
                <Users className="h-5 w-5" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="card-hover bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
            <CardDescription>
              Últimos pedidos procesados por tus bots IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-white/30 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {order.customer.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.product}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">{order.amount}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
