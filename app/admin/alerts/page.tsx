"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"
import { useState } from "react"

export default function AdminNotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const notifications = [
    {
      id: "NOT-001",
      student: {
        name: "María González",
        id: "2021001234",
        program: "Psicología",
        email: "maria.gonzalez@universidad.edu",
        semester: "6to",
        phone: "+57 300 123 4567",
        emergencyContact: "Ana González (Madre) - +57 300 987 6543",
      },
      type: "stress",
      severity: "high",
      description: "Nivel de estrés alto (4.5/5) reportado por 7 días consecutivos",
      surveyData: {
        mood: 2.1,
        stress: 4.5,
        sleep: 3.2,
        date: "2024-01-15",
      },
      lastUpdate: "Hace 2 horas",
      status: "active",
    },
    {
      id: "NOT-002",
      student: {
        name: "Luis Herrera",
        id: "2021001237",
        program: "Derecho",
        email: "luis.herrera@universidad.edu",
        semester: "2do",
        phone: "+57 300 456 7890",
        emergencyContact: "Carmen Herrera (Madre) - +57 300 654 3210",
      },
      type: "mood",
      severity: "high",
      description: "Estado de ánimo bajo persistente (2.1/5) por 10 días",
      surveyData: {
        mood: 2.1,
        stress: 3.8,
        sleep: 2.5,
        date: "2024-01-15",
      },
      lastUpdate: "Hace 4 horas",
      status: "active",
    },
    {
      id: "NOT-003",
      student: {
        name: "Ana Rodríguez",
        id: "2021001236",
        program: "Medicina",
        email: "ana.rodriguez@universidad.edu",
        semester: "8vo",
        phone: "+57 300 789 0123",
        emergencyContact: "Pedro Rodríguez (Padre) - +57 300 321 0987",
      },
      type: "sleep",
      severity: "medium",
      description: "Patrón de sueño irregular (menos de 4 horas por noche) durante 5 días",
      surveyData: {
        mood: 3.2,
        stress: 4.1,
        sleep: 1.8,
        date: "2024-01-15",
      },
      lastUpdate: "Hace 6 horas",
      status: "active",
    },
  ]

  const notificationStats = {
    total: 47,
    high: 8,
    medium: 23,
    low: 16,
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

  const getNotificationIcon = (type: string) => {
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
      <AdminSidebarNav collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div
        className={`flex-1 p-4 md:p-6 space-y-4 md:space-y-6 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-0"}`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Notificaciones</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Estudiantes que requieren atención por mal estado emocional
            </p>
          </div>
        </div>

        {/* Notification Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold">{notificationStats.total}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Total activas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-red-600">{notificationStats.high}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Severidad alta</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-yellow-600">{notificationStats.medium}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Severidad media</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-blue-600">{notificationStats.low}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Severidad baja</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="border-l-4 border-l-red-500">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <div>
                      <CardTitle className="text-lg">{notification.student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {notification.student.program} • ID: {notification.student.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getSeverityBadge(notification.severity)}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Descripción del problema</h4>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Datos de la encuesta</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Ánimo</p>
                          <p className="font-bold text-lg">{notification.surveyData.mood}/5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Estrés</p>
                          <p className="font-bold text-lg">{notification.surveyData.stress}/5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Sueño</p>
                          <p className="font-bold text-lg">{notification.surveyData.sleep}/5</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">Actualizado: {notification.lastUpdate}</div>
                  </div>

                  <div className="space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-full" onClick={() => setSelectedStudent(notification.student)}>
                          Ver perfil
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Perfil del Estudiante</DialogTitle>
                        </DialogHeader>
                        {selectedStudent && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Nombre completo</p>
                                <p className="text-sm">{selectedStudent.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">ID Estudiante</p>
                                <p className="text-sm">{selectedStudent.id}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Programa</p>
                                <p className="text-sm">{selectedStudent.program}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Semestre</p>
                                <p className="text-sm">{selectedStudent.semester}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p className="text-sm">{selectedStudent.email}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                                <p className="text-sm">{selectedStudent.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Contacto de emergencia</p>
                                <p className="text-sm">{selectedStudent.emergencyContact}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
