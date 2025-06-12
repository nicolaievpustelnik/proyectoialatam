
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Users, Clock, ArrowUp, Check, BriefcaseBusiness, ChartNoAxesCombined, UserRoundCog } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userProfile, logout } = useAuth();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: Clock },
    { path: "/clients", label: "Clientes", icon: Users },
    { path: "/products", label: "Productos", icon: Check },
    { path: "/orders", label: "Pedidos", icon: ArrowUp },
    { path: "/bot-config", label: "Config. Bot", icon: MessageSquare },
    { path: "/analytics", label: "Analytics", icon: ChartNoAxesCombined },
  ];

  if (userProfile?.rol === "admin") {
    menuItems.push(
      { path: "/companies", label: "Empresas", icon: BriefcaseBusiness },
      { path: "/admins", label: "Administradores", icon: UserRoundCog },
    );
  }

  return (
    <div className={cn(
      "bg-white/90 backdrop-blur-sm border-r border-white/20 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg gradient-text">EcommerceBot</span>
          )}
        </div>
      </div>

      <nav className="px-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start mb-2",
                isActive && "bg-gradient-primary text-white",
                isCollapsed && "px-2"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full"
        >
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
