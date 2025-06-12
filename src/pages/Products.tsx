import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Plus, X, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type Product = {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen?: string;
  status: string;
  empresa?: string;
};

type Empresa = {
  id: string;
  nombre: string;
};

type Usuario = {
  rol: "admin" | "cliente";
  empresa: string;
};

const Status = {
  ACTIVO: "Activo",
  SIN_STOCK: "Sin Stock",
  PAUSADO: "Pausado",
} as const;

const Products = () => {
  const { userProfile } = useAuth();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [empresaFilter, setEmpresaFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [newProduct, setNewProduct] = useState<Product>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    status: Status.ACTIVO,
    imagen: "",
    empresa: "",
  });

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditMode(true);
    setShowModal(true);
  };

  const handleOpenAddModal = () => {
    setNewProduct({
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
      status: Status.ACTIVO,
      imagen: "",
      empresa: "",
    });
    setEditMode(false);
    setShowModal(true);
  };


  const handleUpdateProduct = async () => {
    if (!newProduct.empresa || !newProduct.id) {
      alert("Faltan datos para actualizar el producto");
      return;
    }

    try {
      const productRef = doc(db, `empresas/${newProduct.empresa}/productos/${newProduct.id}`);
      await updateDoc(productRef, {
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        precio: newProduct.precio,
        stock: newProduct.stock,
        status: newProduct.status,
        imagen: newProduct.imagen,
      });

      setShowModal(false);
      setNewProduct({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        status: Status.ACTIVO,
        imagen: "",
        empresa: "",
      });
      setEditMode(false);
      setLoading(true);

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await fetchUserAndProducts(user);
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  useEffect(() => {
    const fetchUserAndProducts = async (user: User) => {
      try {
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) throw new Error("Usuario no encontrado");

        const usuarioData = userSnap.data() as Usuario;
        if (usuarioData) {
          setUserData(usuarioData);

          if (usuarioData.rol !== "admin") {
            setNewProduct((prev) => ({
              ...prev,
              empresa: usuarioData.empresa || "",
            }));
          }
        }

        let empresasList: Empresa[] = [];

        if (usuarioData.rol === "admin") {
          const empresasSnapshot = await getDocs(collection(db, "empresas"));
          empresasList = empresasSnapshot.docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
          })) as Empresa[];
          setEmpresas(empresasList);
        }

        let productsData: Product[] = [];

        if (usuarioData.rol === "admin") {
          for (const empresa of empresasList) {
            const productosSnapshot = await getDocs(
              collection(db, `empresas/${empresa.id}/productos`)
            );
            const productos = productosSnapshot.docs.map((doc) => ({
              id: doc.id,
              empresa: empresa.id,
              ...doc.data(),
            })) as Product[];

            productsData.push(...productos);
          }
        } else {
          const productosSnapshot = await getDocs(
            collection(db, `empresas/${usuarioData.empresa}/productos`)
          );
          productsData = productosSnapshot.docs.map((doc) => ({
            id: doc.id,
            empresa: usuarioData.empresa,
            ...doc.data(),
          })) as Product[];

          setEmpresas([{ id: usuarioData.empresa, nombre: "Mi Empresa" }]);
        }

        setProducts(productsData);
      } catch (error) {
        console.error("Error al obtener productos de Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      fetchUserAndProducts(currentUser);
    }
  }, []);


  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEmpresa =
      empresaFilter === "" || product.empresa === empresaFilter;

    const matchesStatus =
      statusFilter === "todos" ||
      (statusFilter === "activo" && product.status === Status.ACTIVO) ||
      (statusFilter === "sinStock" && product.stock === 0);

    return matchesSearch && matchesEmpresa && matchesStatus;
  });


  const getStatusColor = (status: string) => {
    switch (status) {
      case Status.ACTIVO:
        return "bg-green-100 text-green-800";
      case Status.SIN_STOCK:
        return "bg-red-100 text-red-800";
      case Status.PAUSADO:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddProduct = async () => {
    let valuePath = "";
    if (!newProduct.empresa && userData.rol === "admin") {
      alert("Selecciona una empresa para el producto");
      return;
    } 

    if(userData.rol === "cliente"){
      valuePath = userData.empresa
    } else {
      valuePath = userData.empresa
    }

    try {
      const ref = collection(db, `empresas/${valuePath}/productos`);
      await addDoc(ref, {
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        precio: newProduct.precio,
        stock: newProduct.stock,
        status: newProduct.status,
        imagen: newProduct.imagen,
      });

      setShowModal(false);
      setNewProduct({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        status: Status.ACTIVO,
        imagen: "",
        empresa: "",
      });

      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const updatedUser = await getDoc(doc(db, "usuarios", user.uid));
        if (updatedUser.exists()) {
          const data = updatedUser.data() as Usuario;
          if (data) {
            await fetchUserAndProducts(user);
          }
        }
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleToggleProductStatus = async (product: Product) => {
    if (!product.id || !product.empresa) {
      console.error("Faltan datos del producto para actualizar el estado");
      return;
    }

    const newStatus =
      product.status === Status.ACTIVO ? Status.PAUSADO : Status.ACTIVO;

    try {
      const productRef = doc(db, `empresas/${product.empresa}/productos/${product.id}`);
      await updateDoc(productRef, {
        status: newStatus,
      });

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error);
    }
  };

  const handleDeleteProduct = async (empresaId: string, productoId: string) => {
    try {
      const productRef = doc(db, "empresas", empresaId, "productos", productoId);
      await deleteDoc(productRef);
      console.log("Producto eliminado con éxito.");

      setProducts((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== productoId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const fetchUserAndProducts = async (user: User) => {
    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);
    const usuarioData = userSnap.data() as Usuario;

    const empresasList =
      usuarioData.rol === "admin"
        ? (
            await getDocs(collection(db, "empresas"))
          ).docs.map((doc) => ({ id: doc.id, nombre: doc.data().nombre }))
        : [{ id: usuarioData.empresa, nombre: "Mi Empresa" }];

    setEmpresas(empresasList);

    let allProducts: Product[] = [];

    for (const empresa of empresasList) {
      const productosSnapshot = await getDocs(
        collection(db, `empresas/${empresa.id}/productos`)
      );
      const productos = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        empresa: empresa.id,
        ...doc.data(),
      })) as Product[];
      allProducts.push(...productos);
    }

    setProducts(allProducts);
    setLoading(false);
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Gestión de Productos"
        subtitle="Administra tu catálogo de productos para los bots IA"
      >
        <div className="px-6 pb-0">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Cargando productos...
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pt-0">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="bg-white/80 backdrop-blur-sm">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <Skeleton className="h-24 w-24 rounded-md" />
              </div>
              <CardHeader>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Gestión de Productos"
      subtitle="Administra tu catálogo de productos para los bots IA"
    >
      <div className="space-y-6 animate-fade-in">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />

              {userProfile?.rol === "admin" && (
                <select
                  value={empresaFilter}
                  onChange={(e) => setEmpresaFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 max-w-xs"
                >
                  <option value="">Todas las empresas</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              )}

              <Button onClick={handleOpenAddModal} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </Button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {filteredProducts.length} resultados encontrados
            </p>
          </CardContent>
        </Card>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-full max-w-lg space-y-4 relative">
              <button className="absolute top-2 right-2" onClick={() => setShowModal(false)}>
                <X />
              </button>
              <h2 className="text-xl font-semibold">
                {editMode ? "Editar Producto" : "Nuevo Producto"}
              </h2>

              <Input
                placeholder="Nombre del producto"
                value={newProduct.nombre}
                onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
              />
              <Input
                placeholder="Descripción"
                value={newProduct.descripcion}
                onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
              />
              <Input
                placeholder="Precio"
                type="text"
                value={newProduct.precio === 0 ? "" : newProduct.precio.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*\.?\d*$/.test(val)) { 
                    setNewProduct({ ...newProduct, precio: val === "" ? 0 : Number(val) });
                  }
                }}
              />
              <Input
                placeholder="Stock"
                type="text"
                value={newProduct.stock === 0 ? "" : newProduct.stock.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setNewProduct({ ...newProduct, stock: val === "" ? 0 : Number(val) });
                  }
                }}
              />
              <Input
                placeholder="URL de la imagen"
                value={newProduct.imagen}
                onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
              />
              <select
                value={newProduct.status}
                onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value={Status.ACTIVO}>Activo</option>
              </select>
              {userProfile?.rol === "admin" ? (
                <select
                  value={newProduct.empresa}
                  onChange={(e) => setNewProduct({ ...newProduct, empresa: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                  <option value="">Selecciona una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={userData?.empresa}
                  disabled
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-500"
                >
                  <option key={userData?.empresa} value={userData?.empresa}>
                    {userData?.empresa || "Empresa no definida"}
                  </option>
                </select>
              )}

              

              <Button onClick={editMode ? handleUpdateProduct : handleAddProduct} className="btn-primary w-full">
                <Check className="w-4 h-4 mr-2" /> {editMode ? "Actualizar" : "Agregar"}
              </Button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No se encontraron productos con ese nombre o descripción.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="card-hover bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {product.imagen ? (
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="h-full object-contain"
                    />
                  ) : (
                    <div className="text-6xl text-gray-400">📦</div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{product.nombre}</CardTitle>
                      <CardDescription className="mt-1">{product.descripcion}</CardDescription>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.rol === "admin" && (
                      <div className="text-sm text-gray-500 font-medium">
                        Empresa: {empresas.find(e => e.id === product.empresa)?.nombre || "Desconocida"}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold gradient-text">
                        ${product.precio}
                      </span>
                      <span className="text-sm text-gray-600">
                        Stock: {product.stock} unidades
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleToggleProductStatus(product)}
                      >
                        {product.status === Status.ACTIVO ? "Pausar" : "Activar"}
                      </Button>
                      <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                          if (confirm("¿Estás seguro que querés eliminar este producto?")) {
                            handleDeleteProduct(product.empresa, product.id);
                          }
                        }}
                        >
                          <Trash />
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            className={`stat-card cursor-pointer ${statusFilter === "todos" ? "border-blue-500 ring-2 ring-blue-200" : ""}`}
            onClick={() => setStatusFilter("todos")}
          >
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {products.length}
              </div>
              <div className="text-gray-600 font-medium">Total Productos</div>
            </CardContent>
          </Card>
          <Card
            className={`stat-card cursor-pointer ${statusFilter === "activo" ? "border-blue-500 ring-2 ring-blue-200" : ""}`}
            onClick={() => setStatusFilter("activo")}
          >
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {products.filter(p => p.status === Status.ACTIVO).length}
              </div>
              <div className="text-gray-600 font-medium">Activos</div>
            </CardContent>
          </Card>
          <Card
            className={`stat-card cursor-pointer ${statusFilter === "sinStock" ? "border-blue-500 ring-2 ring-blue-200" : ""}`}
            onClick={() => setStatusFilter("sinStock")}
          >
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {products.filter(p => p.stock === 0).length}
              </div>
              <div className="text-gray-600 font-medium">Sin Stock</div>
            </CardContent>
          </Card>
          {(userData?.rol === "cliente" || (userData?.rol === "admin" && empresaFilter)) && (
            <Card className="stat-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  ${products.reduce((sum, p) => sum + (p.precio * p.stock), 0).toLocaleString()}
                </div>
                <div className="text-gray-600 font-medium">
                  Valor Inventario
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
