import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EmpresaForm from "@/pages/EmpresaForm";
import { Empresa } from "@/interfaces";

import {
  getEmpresas,
  addEmpresa,
  updateEmpresa,
  deleteEmpresa,
} from "@/lib/firebaseHelpers";

const Companies = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selected, setSelected] = useState<Empresa | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const data = await getEmpresas();
    setEmpresas(data);
    setShowForm(false);
    setSelected(null);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = (empresa: Empresa) => {
    setSelected(empresa);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteEmpresa(id);
    refresh();
  };

  const handleSubmit = async (data: Empresa) => {
    if (selected?.id) {
      await updateEmpresa(selected.id, data);
    } else {
      await addEmpresa(data);
    }
    refresh();
  };

  return (
    <DashboardLayout title="Empresas" subtitle="Gestioná tus clientes empresa">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Empresas</h1>
          <Button onClick={handleAdd} className="flex gap-2">
            <PlusCircle className="w-4 h-4" /> Agregar Empresa
          </Button>
        </div>

        {showForm && (
          <EmpresaForm
            initialData={selected || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        {loading ? (
          <p>Cargando empresas...</p>
        ) : (
          <Card>
            <CardContent className="p-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500">Documento</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500">País</th> 
                    <th className="px-6 py-3 text-left text-xs text-gray-500">Teléfono</th>
                    <th className="px-6 py-3 text-right text-xs text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {empresas.map(emp => (
                    <tr key={emp.id ?? Math.random()}>
                      <td className="px-6 py-4 text-sm">{emp.nombre}</td>
                      <td className="px-6 py-4 text-sm">{emp.documento}</td>
                      <td className="px-6 py-4 text-sm">{emp.email}</td>
                      <td className="px-6 py-4 text-sm">{emp.pais}</td>
                      <td className="px-6 py-4 text-sm">{emp.telefono}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(emp)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Companies;
