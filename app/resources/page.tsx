import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import { Badge } from "@/components/ui/badge"

export default function ResourcesPage() {
  const emergencyContacts = [
    {
      name: "Centro de Bienestar Estudiantil",
      phone: "+57 313 485 7584",
      email: "bienestar@uniempresarial.edu.co",
      hours: "Lun-Vie 9:00-17:00",
      type: "Presencial",
    },
    {
      name: "Psicología Universitaria",
      phone: "+57 312 625 8745",
      email: "psicologia@uniempresarial.edu.co",
      hours: "Lun-Vie 9:00-17:00",
      type: "Citas",
    },
    {
      name: "Línea de Crisis 24/7",
      phone: "123",
      email: "crisis@salud.gov.co",
      hours: "24 horas",
      type: "Emergencia",
    },
  ]

  const selfCareActivities = [
    {
      category: "Relajación",
      icon: "🧘",
      activities: ["Respiración profunda (5 minutos)", "Meditación guiada", "Yoga suave", "Escuchar música relajante"],
    },
    {
      category: "Actividad física",
      icon: "🏃",
      activities: ["Caminar 15 minutos", "Estiramientos", "Bailar tu música favorita", "Ejercicios de bajo impacto"],
    },
    {
      category: "Conexión social",
      icon: "👥",
      activities: [
        "Llamar a un amigo",
        "Escribir en tu diario",
        "Unirte a grupos de estudio",
        "Participar en actividades universitarias",
      ],
    },
    {
      category: "Autocuidado",
      icon: "💚",
      activities: ["Tomar un baño relajante", "Leer un libro", "Preparar una comida saludable", "Organizar tu espacio"],
    },
  ]

  const resources = [
    {
      title: "Guía de manejo del estrés académico",
      description: "Técnicas probadas para manejar la presión de los estudios",
      type: "PDF",
      duration: "15 min lectura",
    },
    {
      title: "Ejercicios de mindfulness para estudiantes",
      description: "Prácticas de atención plena adaptadas a la vida universitaria",
      type: "Audio",
      duration: "10-20 min",
    },
    {
      title: "Taller: Equilibrio vida-estudio",
      description: "Próximo taller grupal sobre balance personal y académico",
      type: "Presencial",
      duration: "2 horas",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Recursos y apoyo</h1>
          <p className="text-primary-foreground/80 text-sm">Herramientas para tu bienestar</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Emergency Banner */}
        <Card className="border-0 shadow-sm bg-destructive/10 border-l-4 border-destructive">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <h3 className="font-semibold text-destructive">¿Necesitas ayuda inmediata?</h3>
                <p className="text-sm text-muted-foreground">
                  Si estás en crisis, llama al 123 o acude al centro médico más cercano.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* University Contacts */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">📞</span>
              Contactos de apoyo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{contact.name}</h3>
                  <Badge variant={contact.type === "Emergencia" ? "destructive" : "secondary"}>{contact.type}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span>📱</span>
                    <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                      {contact.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✉️</span>
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                      {contact.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🕒</span>
                    {contact.hours}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Self-Care Activities */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">🌱</span>
              Actividades de autocuidado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selfCareActivities.map((category, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {category.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className="p-3 bg-muted rounded-lg text-sm hover:bg-accent transition-colors cursor-pointer"
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Educational Resources */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">📚</span>
              Recursos educativos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                  </div>
                  <Badge variant="outline">{resource.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{resource.duration}</span>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Acceder
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">💡</span>
              Consejos rápidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
              <p className="text-sm font-medium text-primary">Técnica 5-4-3-2-1</p>
              <p className="text-sm text-muted-foreground">
                Identifica 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles y 1 que saboreas.
              </p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg border-l-4 border-secondary">
              <p className="text-sm font-medium text-secondary">Respiración 4-7-8</p>
              <p className="text-sm text-muted-foreground">
                Inhala 4 segundos, mantén 7 segundos, exhala 8 segundos. Repite 4 veces.
              </p>
            </div>
            <div className="p-3 bg-chart-2/10 rounded-lg border-l-4 border-chart-2">
              <p className="text-sm font-medium text-chart-2">Regla del 20-20-20</p>
              <p className="text-sm text-muted-foreground">
                Cada 20 minutos, mira algo a 20 metros de distancia por 20 segundos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
