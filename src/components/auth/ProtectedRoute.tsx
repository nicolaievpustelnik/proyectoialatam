
import { useAuth } from '@/contexts/AuthContext';
import Auth from '@/pages/Auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { currentUser, userProfile } = useAuth();

  if (!currentUser || !userProfile) {
    return <Auth />;
  }

  if (adminOnly && userProfile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
          <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
