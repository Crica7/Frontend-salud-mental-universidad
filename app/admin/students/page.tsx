import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminSidebarNav } from "@/components/admin/sidebar-nav"

export default function AdminStudentsPage() {
  const students = [
    {
      id: "2021001234",
      name: "María González",
      email: "maria.gonzalez@universidad.edu",
      program: "Psicología",
      semester: "6to",
      lastActivity: "Hace 2 horas",
      averageMood: 3.2,
      status: "attention",
      alerts: 2,
    },
    {
      id: "2021001235",
      name: "Carlos Mendoza",
      email: "carlos.mendoza@universidad.edu",
      program: "Ingeniería",
      semester: "4to",
      lastActivity: "Hace 1 día",
      averageMood: 4.1,
      status: "good",
      alerts: 0,
    },
    {
      id: "2021001236",
      name: "Ana Rodríguez",
      email: "ana.rodriguez@universidad.edu",
      program: "Medicina",
      semester: "8vo",
      lastActivity: "Hace 3 horas",
      averageMood: 3.8,
      status: "good",
      alerts: 0,
    },
    {
      id: "2021001237",
      name: "Luis Herrera",
      email: "luis.herrera@universidad.edu",
      program: "Derecho",
      semester: "2do",
      lastActivity: "Hace 5 días",
      averageMood: 2.8,
      status: "critical",
      alerts: 3,
    },
    {
      id: "2021001238",
      name: "Sofia Vargas",
      email: "sofia.vargas@universidad.edu",
      program: "Administración",
      semester: "5to",
      lastActivity: "Hace 1 hora",
      averageMood: 4.5,
      status: "excellent",
      alerts: 0,
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
      <AdminSidebarNav />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Estudiantes</h1>
            <p className="text-muted-foreground">Monitoreo y seguimiento del bienestar estudiantil</p>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar estudiante..." className="w-64" />
            <Button variant="outline">Filtros</Button>
            <Button>Exportar lista</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">127</div>
              <p className="text-sm text-muted-foreground">Estado excelente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">856</div>
              <p className="text-sm text-muted-foreground">Estado bueno</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">234</div>
              <p className="text-sm text-muted-foreground">Requieren atención</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">30</div>
              <p className="text-sm text-muted-foreground">Estado crítico</p>
            </CardContent>
          </Card>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="font-medium text-primary">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.program} - {student.semester} semestre
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Ánimo promedio</p>
                        <p className={`text-lg font-bold ${getMoodColor(student.averageMood)}`}>
                          {student.averageMood}/5
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Última actividad</p>
                        <p className="text-sm">{student.lastActivity}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Estado</p>
                        {getStatusBadge(student.status)}
                      </div>

                      {student.alerts > 0 && (
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Alertas</p>
                          <Badge variant="destructive">{student.alerts}</Badge>
                        </div>
                      )}

                      <Button variant="outline" size="sm">
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
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
