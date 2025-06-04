
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

const BotConfig = () => {
  const [botName, setBotName] = useState("AsistenteBot");
  const [welcomeMessage, setWelcomeMessage] = useState("¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?");
  const [isWhatsAppActive, setIsWhatsAppActive] = useState(true);
  const [isInstagramActive, setIsInstagramActive] = useState(true);
  const [autoRespond, setAutoRespond] = useState(true);

  const predefinedResponses = [
    {
      trigger: "horarios",
      response: "Nuestros horarios de atención son de Lunes a Viernes de 9:00 AM a 6:00 PM"
    },
    {
      trigger: "envios",
      response: "Realizamos envíos a toda la ciudad. El costo varía según la zona."
    },
    {
      trigger: "pago",
      response: "Aceptamos efectivo, transferencia bancaria y tarjetas de crédito/débito."
    }
  ];

  const botStats = [
    { label: "Conversaciones Hoy", value: "127", change: "+23%" },
    { label: "Respuestas Automatizadas", value: "89%", change: "+5%" },
    { label: "Satisfacción Cliente", value: "4.8/5", change: "+0.2" },
    { label: "Tiempo Respuesta", value: "1.2s", change: "-0.3s" }
  ];

  return (
    <DashboardLayout 
      title="Configuración de Bots IA" 
      subtitle="Personaliza el comportamiento de tus asistentes virtuales"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Bot Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {botStats.map((stat, index) => (
            <Card key={index} className="stat-card">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-green-600 font-medium">
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Basic Configuration */}
        <Card className="card-hover bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Configuración Básica del Bot
            </CardTitle>
            <CardDescription>
              Personaliza la identidad y comportamiento principal de tu bot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Nombre del Bot</label>
                <Input
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="Nombre de tu asistente virtual"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Personalidad</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Amigable y profesional</option>
                  <option>Formal y corporativo</option>
                  <option>Casual y divertido</option>
                  <option>Directo y eficiente</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Mensaje de Bienvenida</label>
              <Textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                placeholder="Mensaje que verán los clientes al iniciar una conversación"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Channel Integration */}
        <Card className="card-hover bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Integración de Canales</CardTitle>
            <CardDescription>
              Activa o desactiva los canales de mensajería
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💬</div>
                  <div>
                    <h3 className="font-medium">WhatsApp Business</h3>
                    <p className="text-sm text-gray-600">API oficial conectada</p>
                  </div>
                </div>
                <Switch
                  checked={isWhatsAppActive}
                  onCheckedChange={setIsWhatsAppActive}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📷</div>
                  <div>
                    <h3 className="font-medium">Instagram DM</h3>
                    <p className="text-sm text-gray-600">Graph API conectada</p>
                  </div>
                </div>
                <Switch
                  checked={isInstagramActive}
                  onCheckedChange={setIsInstagramActive}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <h3 className="font-medium">Respuesta Automática</h3>
                <p className="text-sm text-gray-600">El bot responde automáticamente sin intervención manual</p>
              </div>
              <Switch
                checked={autoRespond}
                onCheckedChange={setAutoRespond}
              />
            </div>
          </CardContent>
        </Card>

        {/* Predefined Responses */}
        <Card className="card-hover bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Respuestas Predefinidas</CardTitle>
            <CardDescription>
              Configura respuestas automáticas para consultas frecuentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predefinedResponses.map((response, index) => (
                <div key={index} className="p-4 bg-white/60 rounded-lg border border-white/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Palabra clave:</label>
                      <Input value={response.trigger} className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">Respuesta:</label>
                      <Input value={response.response} className="mt-1" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed border-2">
                + Agregar Nueva Respuesta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Actions */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline">
            Vista Previa
          </Button>
          <Button className="btn-primary">
            Guardar Configuración
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BotConfig;
