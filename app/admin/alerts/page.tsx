import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"

export default function AdminAlertsPage() {
  const criticalAlerts = [
    {
      id: "ALT-001",
      student: {
        name: "María González",
        id: "2021001234",
        program: "Psicología",
        email: "maria.gonzalez@universidad.edu",
      },
      type: "stress",
      severity: "high",
      description: "Nivel de estrés alto (4.5/5) reportado por 7 días consecutivos",
      triggers: ["Exámenes finales", "Problemas familiares", "Carga académica"],
      lastUpdate: "Hace 2 horas",
      status: "active",
      assignedTo: "Dra. Rodriguez",
      recommendations: [
        "Sesión de consejería inmediata",
        "Evaluación de carga académica",
        "Técnicas de manejo del estrés",
      ],
    },
    {
      id: "ALT-002",
      student: {
        name: "Luis Herrera",
        id: "2021001237",
        program: "Derecho",
        email: "luis.herrera@universidad.edu",
      },
      type: "mood",
      severity: "high",
      description: "Estado de ánimo bajo persistente (2.1/5) por 10 días",
      triggers: ["Aislamiento social", "Bajo rendimiento académico", "Problemas económicos"],
      lastUpdate: "Hace 4 horas",
      status: "in-progress",
      assignedTo: "Psic. Martinez",
      recommendations: ["Evaluación psicológica completa", "Apoyo financiero", "Grupos de apoyo"],
    },
    {
      id: "ALT-003",
      student: {
        name: "Ana Rodríguez",
        id: "2021001236",
        program: "Medicina",
        email: "ana.rodriguez@universidad.edu",
      },
      type: "sleep",
      severity: "medium",
      description: "Patrón de sueño irregular (menos de 4 horas por noche) durante 5 días",
      triggers: ["Guardias médicas", "Estrés académico", "Ansiedad"],
      lastUpdate: "Hace 6 horas",
      status: "active",
      assignedTo: "Dr. Fernandez",
      recommendations: ["Higiene del sueño", "Ajuste de horarios", "Técnicas de relajación"],
    },
  ]

  const alertStats = {
    total: 47,
    high: 8,
    medium: 23,
    low: 16,
    resolved: 156,
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge variant="default">Media</Badge>
      case "low":
        return <Badge variant="secondary">Baja</Badge>
      default:
        return <Badge variant="outline">Desconocida</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Activa</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En progreso</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resuelta</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "stress":
        return "🧘"
      case "mood":
        return "😔"
      case "sleep":
        return "😴"
      default:
        return "⚠️"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebarNav />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Alertas Críticas</h1>
            <p className="text-muted-foreground">Monitoreo y gestión de casos que requieren atención inmediata</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Filtrar por severidad
            </Button>
            <Button variant="outline" size="sm">
              Exportar reporte
            </Button>
            <Button size="sm">Nueva alerta manual</Button>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{alertStats.total}</div>
              <p className="text-sm text-muted-foreground">Total activas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{alertStats.high}</div>
              <p className="text-sm text-muted-foreground">Severidad alta</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{alertStats.medium}</div>
              <p className="text-sm text-muted-foreground">Severidad media</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{alertStats.low}</div>
              <p className="text-sm text-muted-foreground">Severidad baja</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{alertStats.resolved}</div>
              <p className="text-sm text-muted-foreground">Resueltas este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts List */}
        <div className="space-y-4">
          {criticalAlerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-red-500">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                    <div>
                      <CardTitle className="text-lg">{alert.student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {alert.student.program} • ID: {alert.student.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(alert.severity)}
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Descripción del problema</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Factores desencadenantes</h4>
                      <div className="flex flex-wrap gap-2">
                        {alert.triggers.map((trigger, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Asignado a: {alert.assignedTo}</span>
                      <span className="text-muted-foreground">Actualizado: {alert.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Recomendaciones de intervención</h4>
                      <ul className="space-y-1">
                        {alert.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Contactar estudiante
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Ver historial completo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Agregar nota
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Programar seguimiento
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Marcar en progreso
                    </Button>
                    <Button size="sm" variant="default">
                      Resolver alerta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alert Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              Tendencias de Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">Tipos más frecuentes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estrés académico</span>
                    <Badge variant="outline">45%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estado de ánimo bajo</span>
                    <Badge variant="outline">32%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Problemas de sueño</span>
                    <Badge variant="outline">23%</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Programas más afectados</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medicina</span>
                    <Badge variant="outline">28%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ingeniería</span>
                    <Badge variant="outline">24%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Derecho</span>
                    <Badge variant="outline">19%</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Tiempo de resolución</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Promedio</span>
                    <Badge variant="outline">3.2 días</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Casos críticos</span>
                    <Badge variant="outline">1.8 días</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasa de resolución</span>
                    <Badge variant="outline">94%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
