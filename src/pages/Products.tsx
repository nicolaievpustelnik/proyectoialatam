
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: "Zapatillas Nike Air Max",
      description: "Zapatillas deportivas cómodas y modernas",
      price: 120,
      stock: 25,
      image: "/placeholder.svg",
      status: "Activo"
    },
    {
      id: 2,
      name: "Camiseta Adidas Original",
      description: "Camiseta de algodón 100% original",
      price: 45,
      stock: 0,
      image: "/placeholder.svg",
      status: "Sin Stock"
    },
    {
      id: 3,
      name: "Mochila Escolar",
      description: "Mochila resistente para estudiantes",
      price: 35,
      stock: 15,
      image: "/placeholder.svg",
      status: "Activo"
    },
    {
      id: 4,
      name: "Reloj Casio Digital",
      description: "Reloj digital resistente al agua",
      price: 89,
      stock: 8,
      image: "/placeholder.svg",
      status: "Activo"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Sin Stock": return "bg-red-100 text-red-800";
      case "Pausado": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout 
      title="Gestión de Productos" 
      subtitle="Administra tu catálogo de productos para los bots IA"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 flex-1">
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <Button className="btn-primary">
                <Check className="h-4 w-4 mr-2" />
                Agregar Producto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="card-hover bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-6xl text-gray-400">📦</div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {product.description}
                    </CardDescription>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold gradient-text">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-600">
                      Stock: {product.stock} unidades
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      {product.status === "Activo" ? "Pausar" : "Activar"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {products.length}
              </div>
              <div className="text-gray-600 font-medium">
                Total Productos
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {products.filter(p => p.status === "Activo").length}
              </div>
              <div className="text-gray-600 font-medium">
                Activos
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {products.filter(p => p.stock === 0).length}
              </div>
              <div className="text-gray-600 font-medium">
                Sin Stock
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">
                Valor Inventario
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
