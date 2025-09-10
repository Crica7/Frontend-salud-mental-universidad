import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"

export default function AdminDashboardPage() {
  const stats = {
    totalStudents: 1247,
    activeToday: 89,
    averageMood: 3.8,
    criticalAlerts: 3,
  }

  const recentAlerts = [
    {
      student: "María González",
      id: "2021001234",
      issue: "Alto nivel de estrés por 5 días consecutivos",
      severity: "high",
      date: "Hace 2 horas",
    },
    {
      student: "Carlos Mendoza",
      id: "2021001235",
      issue: "Estado de ánimo bajo persistente",
      severity: "medium",
      date: "Hace 4 horas",
    },
    {
      student: "Ana Rodríguez",
      id: "2021001236",
      issue: "Patrón de sueño irregular",
      severity: "low",
      date: "Hace 6 horas",
    },
  ]

  const weeklyTrends = [
    { day: "Lun", mood: 3.5, stress: 3.2, participation: 78 },
    { day: "Mar", mood: 3.7, stress: 3.0, participation: 82 },
    { day: "Mié", mood: 3.9, stress: 2.8, participation: 85 },
    { day: "Jue", mood: 4.1, stress: 2.5, participation: 88 },
    { day: "Vie", mood: 4.3, stress: 2.3, participation: 91 },
    { day: "Sáb", mood: 4.0, stress: 2.1, participation: 76 },
    { day: "Dom", mood: 3.8, stress: 2.4, participation: 68 },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebarNav />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Panel de Control</h1>
            <p className="text-muted-foreground">Resumen del bienestar estudiantil</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Última actualización: hace 5 min</Badge>
            <Button variant="outline" size="sm">
              Exportar reporte
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estudiantes Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12 esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Activos Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeToday}</div>
              <p className="text-xs text-muted-foreground">7.1% del total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ánimo Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.averageMood}/5</div>
              <p className="text-xs text-muted-foreground">+0.3 vs semana pasada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Críticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.criticalAlerts}</div>
              <p className="text-xs text-muted-foreground">Requieren atención</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                Tendencias Semanales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Día</span>
                  <span>Ánimo</span>
                  <span>Estrés</span>
                  <span>Participación</span>
                </div>
                {weeklyTrends.map((trend, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="w-8">{trend.day}</span>
                    <div className="flex items-center gap-2 w-16">
                      <span>{trend.mood}</span>
                      <div className="w-8 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(trend.mood / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-16">
                      <span>{trend.stress}</span>
                      <div className="w-8 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-chart-3 rounded-full"
                          style={{ width: `${(trend.stress / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-16">
                      <span>{trend.participation}%</span>
                      <div className="w-8 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${trend.participation}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">🚨</span>
                Alertas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{alert.student}</p>
                        <p className="text-sm text-muted-foreground">ID: {alert.id}</p>
                      </div>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Media" : "Baja"}
                      </Badge>
                    </div>
                    <p className="text-sm">{alert.issue}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                      <Button size="sm" variant="outline">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 flex flex-col gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <span className="text-sm">Revisar Estudiantes</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-sm">Generar Reporte</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 bg-transparent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="text-sm">Ver Alertas</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
