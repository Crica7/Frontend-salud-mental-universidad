"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import Link from "next/link"

interface StudentProfilePageProps {
  params: {
    id: string
  }
}

export default function StudentProfilePage({ params }: StudentProfilePageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock student data - in real app this would come from API/database
  const student = {
    id: params.id,
    name: "María González",
    email: "maria.gonzalez@universidad.edu",
    program: "Psicología",
    semester: "6to",
    enrollmentDate: "2021-08-15",
    phone: "+57 300 123 4567",
    emergencyContact: {
      name: "Carmen González",
      relationship: "Madre",
      phone: "+57 300 987 6543",
    },
    currentStatus: "attention",
    averageMood: 3.2,
    averageStress: 3.8,
    averageSleep: 3.5,
    lastSurvey: "2024-01-15",
    totalSurveys: 45,
  }

  const recentSurveys = [
    {
      date: "2024-01-15",
      mood: 2.5,
      stress: 4.2,
      sleep: 3.0,
      notes: "Me siento abrumada con los exámenes finales. No he podido dormir bien.",
    },
    {
      date: "2024-01-14",
      mood: 3.0,
      stress: 4.0,
      sleep: 3.2,
      notes: "Día difícil, mucha presión académica.",
    },
    {
      date: "2024-01-13",
      mood: 3.5,
      stress: 3.5,
      sleep: 3.8,
      notes: "Mejor día, pude estudiar con calma.",
    },
    {
      date: "2024-01-12",
      mood: 2.8,
      stress: 4.1,
      sleep: 2.5,
      notes: "Problemas para concentrarme, mucho estrés.",
    },
    {
      date: "2024-01-11",
      mood: 3.2,
      stress: 3.8,
      sleep: 3.5,
      notes: "Día regular, tratando de mantener rutina de estudio.",
    },
  ]

  const alerts = [
    {
      id: "ALT-001",
      type: "stress",
      severity: "high",
      description: "Nivel de estrés alto por 5 días consecutivos",
      date: "2024-01-15",
      status: "active",
    },
    {
      id: "ALT-002",
      type: "mood",
      severity: "medium",
      description: "Estado de ánimo bajo durante 3 días",
      date: "2024-01-13",
      status: "resolved",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excelente</Badge>
      case "good":
        return <Badge variant="secondary">Bien</Badge>
      case "attention":
        return <Badge variant="default">Requiere atención</Badge>
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
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

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600"
    if (score >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebarNav collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div
        className={`flex-1 p-4 md:p-6 space-y-4 md:space-y-6 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-0"}`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/students">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Perfil de Estudiante</h1>
              <p className="text-muted-foreground text-sm md:text-base">{student.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Exportar historial
            </Button>
            <Button size="sm">Contactar estudiante</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-medium text-primary text-lg">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Programa</p>
                    <p className="text-sm text-muted-foreground">{student.program}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Semestre</p>
                    <p className="text-sm text-muted-foreground">{student.semester}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">{student.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Fecha de ingreso</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(student.enrollmentDate).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Contacto de emergencia</h4>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{student.emergencyContact.name}</span>
                      <span className="text-muted-foreground"> ({student.emergencyContact.relationship})</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{student.emergencyContact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  Estado Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Estado general</p>
                  {getStatusBadge(student.currentStatus)}
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Ánimo</p>
                    <p className={`text-xl font-bold ${getScoreColor(student.averageMood)}`}>{student.averageMood}/5</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estrés</p>
                    <p className={`text-xl font-bold ${getScoreColor(5 - student.averageStress)}`}>
                      {student.averageStress}/5
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sueño</p>
                    <p className={`text-xl font-bold ${getScoreColor(student.averageSleep)}`}>
                      {student.averageSleep}/5
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Última encuesta</span>
                    <span>{new Date(student.lastSurvey).toLocaleDateString("es-ES")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total encuestas</span>
                    <span>{student.totalSurveys}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Surveys */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  Encuestas Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSurveys.map((survey, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="font-medium">{new Date(survey.date).toLocaleDateString("es-ES")}</h4>
                        <div className="flex gap-4 text-sm">
                          <span className={`font-medium ${getScoreColor(survey.mood)}`}>Ánimo: {survey.mood}/5</span>
                          <span className={`font-medium ${getScoreColor(5 - survey.stress)}`}>
                            Estrés: {survey.stress}/5
                          </span>
                          <span className={`font-medium ${getScoreColor(survey.sleep)}`}>Sueño: {survey.sleep}/5</span>
                        </div>
                      </div>
                      {survey.notes && (
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm italic">"{survey.notes}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alerts History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">🚨</span>
                  Historial de Alertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{alert.description}</h4>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
                            {alert.status === "active" ? "Activa" : "Resuelta"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(alert.date).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  Progreso Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Ánimo promedio</p>
                      <Progress value={(student.averageMood / 5) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{student.averageMood}/5</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Nivel de estrés</p>
                      <Progress value={(student.averageStress / 5) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{student.averageStress}/5</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Calidad del sueño</p>
                      <Progress value={(student.averageSleep / 5) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{student.averageSleep}/5</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
