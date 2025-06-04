
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'cliente'>('cliente');
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (role === 'cliente' && !storeName) {
      toast.error('Por favor ingresa el nombre de tu tienda');
      return;
    }

    try {
      setLoading(true);
      await register(email, password, role, storeName);
      toast.success('¡Cuenta creada exitosamente!');
    } catch (error) {
      toast.error('Error al crear la cuenta. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center gradient-text">
          Crear Cuenta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="role">Tipo de Usuario</Label>
            <Select value={role} onValueChange={(value: 'admin' | 'cliente') => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">Cliente (Tienda)</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === 'cliente' && (
            <div>
              <Label htmlFor="storeName">Nombre de la Tienda</Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Mi Tienda Online"
              />
            </div>
          )}

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full btn-primary"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Cuenta'}
          </Button>
          
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={onToggleMode}
              className="text-sm"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
