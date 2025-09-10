import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"

export default function AdminReportsPage() {
  const monthlyData = [
    { month: "Ene", mood: 3.2, stress: 3.8, sleep: 3.5, participation: 72 },
    { month: "Feb", mood: 3.4, stress: 3.6, sleep: 3.7, participation: 75 },
    { month: "Mar", mood: 3.6, stress: 3.4, sleep: 3.8, participation: 78 },
    { month: "Abr", mood: 3.8, stress: 3.2, sleep: 4.0, participation: 82 },
    { month: "May", mood: 4.0, stress: 3.0, sleep: 4.1, participation: 85 },
    { month: "Jun", mood: 4.2, stress: 2.8, sleep: 4.3, participation: 88 },
  ]

  const programAnalysis = [
    { program: "Psicología", students: 234, avgMood: 4.1, avgStress: 2.8, alerts: 12 },
    { program: "Ingeniería", students: 456, avgMood: 3.7, avgStress: 3.4, alerts: 28 },
    { program: "Medicina", students: 189, avgMood: 3.5, avgStress: 3.8, alerts: 35 },
    { program: "Derecho", students: 167, avgMood: 3.9, avgStress: 3.1, alerts: 15 },
    { program: "Administración", students: 201, avgMood: 4.0, avgStress: 2.9, alerts: 18 },
  ]

  const emotionalDistribution = [
    { emotion: "Muy bien", count: 312, percentage: 25, color: "bg-green-500" },
    { emotion: "Bien", count: 498, percentage: 40, color: "bg-primary" },
    { emotion: "Regular", count: 312, percentage: 25, color: "bg-yellow-500" },
    { emotion: "Mal", count: 100, percentage: 8, color: "bg-orange-500" },
    { emotion: "Muy mal", count: 25, percentage: 2, color: "bg-red-500" },
  ]

  const getBarHeight = (value: number, max = 5) => `${(value / max) * 100}%`

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebarNav />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reportes y Analytics</h1>
            <p className="text-muted-foreground">Análisis detallado del bienestar estudiantil</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Última semana
            </Button>
            <Button variant="outline" size="sm">
              Último mes
            </Button>
            <Button size="sm">Últimos 3 meses</Button>
            <Button variant="outline">Exportar PDF</Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Participación Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">82.3%</div>
              <p className="text-xs text-green-600">+5.2% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ánimo General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">3.8/5</div>
              <p className="text-xs text-green-600">+0.3 vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Nivel de Estrés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">3.1/5</div>
              <p className="text-xs text-green-600">-0.4 vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calidad del Sueño</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">4.0/5</div>
              <p className="text-xs text-green-600">+0.2 vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">📈</span>
                Tendencias Mensuales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Mes</span>
                  <span>Ánimo</span>
                  <span>Estrés</span>
                  <span>Sueño</span>
                  <span>Participación</span>
                </div>
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="w-8">{data.month}</span>
                    <div className="flex items-center gap-2 w-16">
                      <span>{data.mood}</span>
                      <div className="w-8 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(data.mood / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-16">
                      <span>{data.stress}</span>
                      <div className="w-8 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-chart-3 rounded-full"
                          style={{ width: `${(data.stress / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-16">
                      <span>{data.sleep}</span>
                      <div className="w-8 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-chart-2 rounded-full"
                          style={{ width: `${(data.sleep / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-16">
                      <span>{data.participation}%</span>
                      <div className="w-8 h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${data.participation}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emotional State Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">😊</span>
                Distribución de Estados Emocionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emotionalDistribution.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.emotion}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.count} estudiantes</span>
                        <Badge variant="outline">{item.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Program Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">🎓</span>
              Análisis por Programa Académico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Programa</th>
                    <th className="text-center p-3 font-medium">Estudiantes</th>
                    <th className="text-center p-3 font-medium">Ánimo Promedio</th>
                    <th className="text-center p-3 font-medium">Estrés Promedio</th>
                    <th className="text-center p-3 font-medium">Alertas Activas</th>
                    <th className="text-center p-3 font-medium">Estado General</th>
                  </tr>
                </thead>
                <tbody>
                  {programAnalysis.map((program, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3 font-medium">{program.program}</td>
                      <td className="p-3 text-center">{program.students}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`font-medium ${
                            program.avgMood >= 4
                              ? "text-green-600"
                              : program.avgMood >= 3
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {program.avgMood}/5
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`font-medium ${
                            program.avgStress <= 2.5
                              ? "text-green-600"
                              : program.avgStress <= 3.5
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {program.avgStress}/5
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {program.alerts > 0 ? (
                          <Badge variant="destructive">{program.alerts}</Badge>
                        ) : (
                          <Badge variant="secondary">0</Badge>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {program.avgMood >= 4 && program.avgStress <= 3 ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excelente</Badge>
                        ) : program.avgMood >= 3.5 && program.avgStress <= 3.5 ? (
                          <Badge variant="secondary">Bueno</Badge>
                        ) : (
                          <Badge variant="default">Atención</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              Insights y Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Tendencia Positiva</h3>
              <p className="text-sm text-green-700">
                El bienestar general ha mejorado un 15% en los últimos 3 meses. Los programas de mindfulness están
                mostrando resultados efectivos.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Área de Oportunidad</h3>
              <p className="text-sm text-yellow-700">
                Los estudiantes de Medicina muestran niveles de estrés más altos. Se recomienda implementar sesiones
                específicas de manejo del estrés para este programa.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Recomendación</h3>
              <p className="text-sm text-blue-700">
                La participación es mayor los miércoles y jueves. Considerar programar actividades de bienestar en estos
                días para maximizar el impacto.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
