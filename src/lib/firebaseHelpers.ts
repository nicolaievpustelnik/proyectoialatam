import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Empresa, Product, Usuario } from "@/interfaces";

export const getUsuarioByUid = async (uid: string): Promise<Usuario> => {
  const userRef = doc(db, "usuarios", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("Usuario no encontrado");
  }

  return userSnap.data() as Usuario;
};

// -----------------------------------------------------------------------------------

// Obtener todas las empresas
export const getEmpresas = async (): Promise<Empresa[]> => {
  const snapshot = await getDocs(collection(db, "empresas"));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      nombre: data.nombre,
      cuit: data.cuit,
      email: data.email,
      documento: data.documento,
      pais: data.pais,
      telefono: data.telefono,
    };
  });
};

// Agregar una nueva empresa
export const addEmpresa = async (data: Omit<Empresa, "id">): Promise<Empresa> => {
  const docRef = await addDoc(collection(db, "empresas"), data);
  return { id: docRef.id, ...data };
};

// Actualizar una empresa
export const updateEmpresa = async (id: string, data: Partial<Omit<Empresa, "id">>) => {
  const ref = doc(db, "empresas", id);
  await updateDoc(ref, data);
};

// Eliminar una empresa
export const deleteEmpresa = async (id: string) => {
  const ref = doc(db, "empresas", id);
  await deleteDoc(ref);
};

// -----------------------------------------------------------------------

// Obtener todos los productos de una empresa específica
export const getProductsByEmpresa = async (empresaId: string): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, `empresas/${empresaId}/productos`));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      stock: data.stock,
      imagen: data.imagen,
      status: data.status,
      empresa: empresaId, // útil si lo necesitas en la UI
    } as Product;
  });
};

// Agregar un nuevo producto a una empresa
export const addProduct = async (empresaId: string, productData: Omit<Product, "id">): Promise<Product> => {
  const docRef = await addDoc(collection(db, `empresas/${empresaId}/productos`), productData);
  return { id: docRef.id, ...productData };
};

// Actualizar un producto existente
export const updateProduct = async (empresaId: string, productId: string, data: Partial<Omit<Product, "id">>) => {
  const ref = doc(db, `empresas/${empresaId}/productos`, productId);
  await updateDoc(ref, data);
};

// Eliminar un producto
export const deleteProduct = async (empresaId: string, productId: string) => {
  const ref = doc(db, `empresas/${empresaId}/productos`, productId);
  await deleteDoc(ref);
};