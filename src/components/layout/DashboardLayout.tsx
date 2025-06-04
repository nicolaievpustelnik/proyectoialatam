
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        <Sidebar className="fixed left-0 top-0 h-screen z-10" />
        
        <div className="flex-1 ml-64">
          <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold gradient-text">{title}</h1>
                {subtitle && (
                  <p className="text-gray-600 mt-1">{subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{userProfile?.email}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {userProfile?.role} {userProfile?.storeName && `- ${userProfile.storeName}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/")}
                    className="border-2"
                  >
                    Inicio
                  </Button>
                  {userProfile?.role === 'admin' && (
                    <Button 
                      className="btn-primary"
                      onClick={() => navigate("/admin")}
                    >
                      Admin Panel
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
                    className="border-2"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
