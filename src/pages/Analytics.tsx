
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, ArrowUp, Clock } from "lucide-react";

const Analytics = () => {
  const salesData = [
    { month: "Ene", sales: 4500, orders: 45 },
    { month: "Feb", sales: 5200, orders: 52 },
    { month: "Mar", sales: 4800, orders: 48 },
    { month: "Abr", sales: 6100, orders: 61 },
    { month: "May", sales: 7300, orders: 73 },
    { month: "Jun", sales: 8900, orders: 89 }
  ];

  const topProducts = [
    { name: "Zapatillas Nike Air Max", sales: 45, revenue: 5400 },
    { name: "Camiseta Adidas Original", sales: 38, revenue: 1710 },
    { name: "Reloj Casio Digital", sales: 25, revenue: 2225 },
    { name: "Mochila Escolar", sales: 22, revenue: 770 }
  ];

  const channelStats = [
    { channel: "WhatsApp", conversations: 245, conversions: 23, rate: "9.4%" },
    { channel: "Instagram", conversations: 189, conversions: 15, rate: "7.9%" }
  ];

  const totalRevenue = salesData.reduce((sum, month) => sum + month.sales, 0);
  const totalOrders = salesData.reduce((sum, month) => sum + month.orders, 0);

  return (
    <DashboardLayout 
      title="Analytics y Reportes" 
      subtitle="Métricas detalladas del rendimiento de tus bots y ventas"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Ingresos Totales
                  </p>
                  <p className="text-3xl font-bold gradient-text">
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    +18.5% vs mes anterior
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <ArrowUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Pedidos Totales
                  </p>
                  <p className="text-3xl font-bold gradient-text">
                    {totalOrders}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    +12.3% vs mes anterior
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Conversaciones
                  </p>
                  <p className="text-3xl font-bold gradient-text">
                    434
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    +25.1% vs mes anterior
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Tasa Conversión
                  </p>
                  <p className="text-3xl font-bold gradient-text">
                    8.7%
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    +2.1% vs mes anterior
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Trend Chart */}
        <Card className="card-hover bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Tendencia de Ventas</CardTitle>
            <CardDescription>
              Evolución mensual de ingresos y pedidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-4 p-4">
              {salesData.map((month, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="bg-gradient-primary rounded-t-lg w-full transition-all duration-500 hover:opacity-80"
                    style={{ height: `${(month.sales / Math.max(...salesData.map(d => d.sales))) * 200}px` }}
                  ></div>
                  <div className="text-sm font-medium">{month.month}</div>
                  <div className="text-xs text-gray-600">${month.sales}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card className="card-hover bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
              <CardDescription>
                Ranking de productos por cantidad de ventas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} unidades vendidas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Channel Performance */}
          <Card className="card-hover bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Rendimiento por Canal</CardTitle>
              <CardDescription>
                Comparativa entre WhatsApp e Instagram
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {channelStats.map((channel, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {channel.channel === "WhatsApp" ? "💬" : "📷"}
                        </span>
                        <span className="font-medium">{channel.channel}</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">
                        {channel.rate} conversión
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/60 p-3 rounded text-center">
                        <div className="font-bold text-lg">{channel.conversations}</div>
                        <div className="text-gray-600">Conversaciones</div>
                      </div>
                      <div className="bg-white/60 p-3 rounded text-center">
                        <div className="font-bold text-lg">{channel.conversions}</div>
                        <div className="text-gray-600">Conversiones</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Actions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="font-medium mb-1">Exportar Reportes</h3>
                <p className="text-sm text-gray-600">Descarga reportes detallados en diferentes formatos</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  Exportar PDF
                </Button>
                <Button variant="outline">
                  Exportar Excel
                </Button>
                <Button className="btn-primary">
                  Reporte Personalizado
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
