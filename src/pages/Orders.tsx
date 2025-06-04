
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, ArrowUp } from "lucide-react";
import { useState } from "react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const orders = [
    {
      id: "#1234",
      customer: "Ana García",
      product: "Zapatillas Nike Air Max",
      quantity: 1,
      amount: 120.00,
      status: "Pendiente",
      date: "2024-06-04 10:30",
      channel: "WhatsApp"
    },
    {
      id: "#1235",
      customer: "Carlos Ruiz",
      product: "Camiseta Adidas Original",
      quantity: 2,
      amount: 90.00,
      status: "Procesando",
      date: "2024-06-04 09:15",
      channel: "Instagram"
    },
    {
      id: "#1236",
      customer: "María López",
      product: "Mochila Escolar",
      quantity: 1,
      amount: 35.00,
      status: "Enviado",
      date: "2024-06-03 16:45",
      channel: "WhatsApp"
    },
    {
      id: "#1237",
      customer: "Pedro Sánchez",
      product: "Reloj Casio Digital",
      quantity: 1,
      amount: 89.00,
      status: "Entregado",
      date: "2024-06-03 14:20",
      channel: "Instagram"
    },
    {
      id: "#1238",
      customer: "Laura Fernández",
      product: "Zapatillas Nike Air Max",
      quantity: 1,
      amount: 120.00,
      status: "Cancelado",
      date: "2024-06-03 11:30",
      channel: "WhatsApp"
    }
  ];

  const statusOptions = ["Todos", "Pendiente", "Procesando", "Enviado", "Entregado", "Cancelado"];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Todos" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Procesando": return "bg-blue-100 text-blue-800";
      case "Enviado": return "bg-purple-100 text-purple-800";
      case "Entregado": return "bg-green-100 text-green-800";
      case "Cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getChannelIcon = (channel: string) => {
    return channel === "WhatsApp" ? "💬" : "📷";
  };

  const ordersByStatus = statusOptions.slice(1).map(status => ({
    status,
    count: orders.filter(order => order.status === status).length,
    total: orders.filter(order => order.status === status).reduce((sum, order) => sum + order.amount, 0)
  }));

  return (
    <DashboardLayout 
      title="Gestión de Pedidos" 
      subtitle="Administra todos los pedidos procesados por tus bots IA"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {ordersByStatus.map((stat, index) => (
            <Card key={index} className="stat-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold gradient-text mb-1">
                  {stat.count}
                </div>
                <div className="text-sm text-gray-600 font-medium mb-1">
                  {stat.status}
                </div>
                <div className="text-xs text-gray-500">
                  ${stat.total.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Input
                placeholder="Buscar por cliente, producto o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className={filterStatus === status ? "bg-gradient-primary" : ""}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
            <CardDescription>
              Total: {filteredOrders.length} pedidos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-white/30 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {order.customer.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{order.id}</p>
                        <span className="text-lg">{getChannelIcon(order.channel)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product} (x{order.quantity})</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-bold text-lg">${order.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
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

export default Orders;
