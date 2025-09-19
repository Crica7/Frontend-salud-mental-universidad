"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"
import { CreateSurveyModal } from "@/components/admin/create-survey-modal"
import { CreateResourceModal } from "@/components/admin/create-resource-modal"
import { useState } from "react"

export default function AdminDashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showCreateSurvey, setShowCreateSurvey] = useState(false)
  const [showCreateResource, setShowCreateResource] = useState(false)

  const stats = {
    totalStudents: 1247,
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

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebarNav collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div
        className={`flex-1 p-4 md:p-6 space-y-4 md:space-y-6 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-0"}`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Panel de Control</h1>
            <p className="text-muted-foreground text-sm md:text-base">Resumen del bienestar estudiantil</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estudiantes Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12 esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ánimo Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-secondary">{stats.averageMood}/5</div>
              <p className="text-xs text-muted-foreground">+0.3 vs semana pasada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Críticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-destructive">{stats.criticalAlerts}</div>
              <p className="text-xs text-muted-foreground">Requieren atención</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-lg">🚨</span>
                Alertas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                      <Button size="sm" variant="outline" className="w-full sm:w-auto bg-transparent">
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
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-lg">⚡</span>
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button className="h-16 flex flex-col gap-2" onClick={() => setShowCreateSurvey(true)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <span className="text-sm">Crear encuesta</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col gap-2 bg-transparent"
                onClick={() => setShowCreateResource(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm">Crear recurso</span>
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
                <span className="text-sm">Ver alertas</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateSurveyModal open={showCreateSurvey} onOpenChange={setShowCreateSurvey} />

      <CreateResourceModal open={showCreateResource} onOpenChange={setShowCreateResource} />
    </div>
  )
}
