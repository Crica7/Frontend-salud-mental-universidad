"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"
import { useState } from "react"

export default function AdminStudentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const students = [
    {
      id: "2021001234",
      name: "María González",
      email: "maria.gonzalez@universidad.edu",
      program: "Psicología",
      semester: "6to",
      phone: "+57 300 123 4567",
      emergencyContact: "Ana González (Madre) - +57 300 987 6543",
      averageMood: 3.2,
      status: "attention",
    },
    {
      id: "2021001235",
      name: "Carlos Mendoza",
      email: "carlos.mendoza@universidad.edu",
      program: "Ingeniería",
      semester: "4to",
      phone: "+57 300 234 5678",
      emergencyContact: "Luis Mendoza (Padre) - +57 300 876 5432",
      averageMood: 4.1,
      status: "good",
    },
    {
      id: "2021001236",
      name: "Ana Rodríguez",
      email: "ana.rodriguez@universidad.edu",
      program: "Medicina",
      semester: "8vo",
      phone: "+57 300 345 6789",
      emergencyContact: "Pedro Rodríguez (Padre) - +57 300 765 4321",
      averageMood: 3.8,
      status: "good",
    },
    {
      id: "2021001237",
      name: "Luis Herrera",
      email: "luis.herrera@universidad.edu",
      program: "Derecho",
      semester: "2do",
      phone: "+57 300 456 7890",
      emergencyContact: "Carmen Herrera (Madre) - +57 300 654 3210",
      averageMood: 2.8,
      status: "critical",
    },
    {
      id: "2021001238",
      name: "Sofia Vargas",
      email: "sofia.vargas@universidad.edu",
      program: "Administración",
      semester: "5to",
      phone: "+57 300 567 8901",
      emergencyContact: "Roberto Vargas (Padre) - +57 300 543 2109",
      averageMood: 4.5,
      status: "excellent",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excelente</Badge>
      case "good":
        return <Badge variant="secondary">Bien</Badge>
      case "attention":
        return <Badge variant="default">Atención</Badge>
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return "text-green-600"
    if (mood >= 3) return "text-yellow-600"
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
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Gestión de Estudiantes</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Monitoreo y seguimiento del bienestar estudiantil
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input placeholder="Buscar estudiante..." className="w-full sm:w-64" />
            <Button variant="outline" size="sm">
              Filtros
            </Button>
            <Button size="sm">Exportar lista</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-xl md:text-2xl font-bold text-green-600">127</div>
              <p className="text-xs md:text-sm text-muted-foreground">Estado excelente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl md:text-2xl font-bold text-primary">856</div>
              <p className="text-xs md:text-sm text-muted-foreground">Estado bueno</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl md:text-2xl font-bold text-yellow-600">234</div>
              <p className="text-xs md:text-sm text-muted-foreground">Requieren atención</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl md:text-2xl font-bold text-red-600">30</div>
              <p className="text-xs md:text-sm text-muted-foreground">Estado crítico</p>
            </CardContent>
          </Card>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-lg">👥</span>
              Lista de Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-primary text-sm">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium truncate">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.program} - {student.semester} semestre
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Ánimo promedio</p>
                        <p className={`text-lg font-bold ${getMoodColor(student.averageMood)}`}>
                          {student.averageMood}/5
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Estado</p>
                        {getStatusBadge(student.status)}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto bg-transparent"
                            onClick={() => setSelectedStudent(student)}
                          >
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
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Ánimo promedio</p>
                                  <p className={`text-sm font-bold ${getMoodColor(selectedStudent.averageMood)}`}>
                                    {selectedStudent.averageMood}/5
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                                  <div className="mt-1">{getStatusBadge(selectedStudent.status)}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4">
              <p className="text-sm text-muted-foreground">Mostrando 5 de 1,247 estudiantes</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
