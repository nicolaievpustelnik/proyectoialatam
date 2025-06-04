
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MessageSquare, Clock, ArrowUp, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: 1,
      name: "TechStore SA",
      email: "admin@techstore.com",
      plan: "Premium",
      status: "Activo",
      products: 45,
      orders: 123,
      revenue: 15420,
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "ModaStyle Boutique",
      email: "info@modastyle.com",
      plan: "Standard",
      status: "Activo",
      products: 78,
      orders: 89,
      revenue: 8950,
      joinDate: "2024-02-20"
    },
    {
      id: 3,
      name: "SportZone",
      email: "ventas@sportzone.com",
      plan: "Premium",
      status: "Suspendido",
      products: 23,
      orders: 45,
      revenue: 3200,
      joinDate: "2024-03-10"
    },
    {
      id: 4,
      name: "HomeDecor Plus",
      email: "contacto@homedecor.com",
      plan: "Basic",
      status: "Activo",
      products: 34,
      orders: 67,
      revenue: 5670,
      joinDate: "2024-04-05"
    }
  ];

  const platformStats = [
    {
      title: "Clientes Totales",
      value: clients.length.toString(),
      change: "+8 este mes",
      icon: Users,
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      title: "Ingresos Totales",
      value: `$${clients.reduce((sum, client) => sum + client.revenue, 0).toLocaleString()}`,
      change: "+22% vs mes anterior",
      icon: ArrowUp,
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      title: "Pedidos Procesados",
      value: clients.reduce((sum, client) => sum + client.orders, 0).toString(),
      change: "+156 esta semana",
      icon: Clock,
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      title: "Bots Activos",
      value: clients.filter(c => c.status === "Activo").length.toString(),
      change: "98% uptime",
      icon: MessageSquare,
      gradient: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Suspendido": return "bg-red-100 text-red-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium": return "bg-purple-100 text-purple-800";
      case "Standard": return "bg-blue-100 text-blue-800";
      case "Basic": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Panel de Administración</h1>
            <p className="text-gray-600 mt-1">Gestiona todos los clientes y bots de la plataforma</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="border-2"
            >
              Ir al Inicio
            </Button>
            <Button 
              className="btn-primary"
              onClick={() => navigate("/dashboard")}
            >
              Ver Dashboard Cliente
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6 animate-fade-in">
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
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
                      {stat.change}
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

        {/* Search and Actions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 flex-1">
                <Input
                  placeholder="Buscar clientes por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  Exportar Datos
                </Button>
                <Button className="btn-primary">
                  <Check className="h-4 w-4 mr-2" />
                  Nuevo Cliente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="card-hover bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Gestión de Clientes</CardTitle>
            <CardDescription>
              Lista completa de clientes y sus estadísticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div 
                  key={client.id}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-white/30 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <p className="text-xs text-gray-500">Cliente desde: {client.joinDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Productos</p>
                      <p className="font-bold text-lg">{client.products}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pedidos</p>
                      <p className="font-bold text-lg">{client.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ingresos</p>
                      <p className="font-bold text-lg">${client.revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(client.plan)}`}>
                      {client.plan}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                    <Button variant="outline" size="sm">
                      Gestionar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Configuración Global</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Configurar APIs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Plantillas de Bots
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Reportes Globales
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Monitoreo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Estado de Bots
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Logs del Sistema
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Alertas y Notificaciones
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Soporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Tickets de Soporte
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Base de Conocimiento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Documentación API
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
