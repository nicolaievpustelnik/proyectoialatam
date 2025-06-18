import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Empresa } from "@/interfaces";

interface Props {
  initialData?: Empresa;
  onSubmit: (data: Empresa) => void;
  onCancel: () => void;
}

export default function EmpresaForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Empresa>(
    initialData || { nombre: "", documento: "", email: "", pais: "", telefono: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.documento || !form.email) return;
    onSubmit(form);
  };

  return (
    <div className="space-y-4 p-4 bg-white border rounded-md shadow">
      <Input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <Input name="documento" placeholder="Documento" value={form.documento} onChange={handleChange} />
      <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <Input name="pais" placeholder="País" value={form.pais} onChange={handleChange} />
      <Input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={handleSubmit}>{initialData ? "Actualizar" : "Agregar"}</Button>
      </div>
    </div>
  );
}