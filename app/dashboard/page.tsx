import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">¡Hola, Kellyn!</h1>
            <p className="text-primary-foreground/80 text-sm">¿Cómo te sientes hoy?</p>
          </div>
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Emotional Check */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">😊</span>
              Estado emocional de hoy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Última actualización: Hace 2 horas</span>
              <span className="text-primary font-medium">Bien</span>
            </div>
            <div className="flex justify-center gap-2">
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl hover:bg-accent transition-colors">
                😢
              </button>
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl hover:bg-accent transition-colors">
                😐
              </button>
              <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl">
                😊
              </button>
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl hover:bg-accent transition-colors">
                😄
              </button>
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl hover:bg-accent transition-colors">
                🤩
              </button>
            </div>
            <Button asChild className="w-full">
              <Link href="/survey">Completar encuesta diaria</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Today's Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">😴</div>
              <h3 className="font-medium text-sm">Sueño</h3>
              <p className="text-2xl font-bold text-primary">7.5h</p>
              <p className="text-xs text-muted-foreground">Anoche</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-medium text-sm">Energía</h3>
              <p className="text-2xl font-bold text-secondary">4/5</p>
              <p className="text-xs text-muted-foreground">Hoy</p>
            </CardContent>
          </Card>
        </div>

        {/* Stress Level */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">🧘</span>
              Nivel de estrés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Bajo</span>
              <span className="text-primary font-medium">Moderado</span>
              <span>Alto</span>
            </div>
            <Progress value={35} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              Tu nivel de estrés ha disminuido un 15% esta semana
            </p>
          </CardContent>
        </Card>

        {/* Personal Notes */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">📝</span>
              Notas personales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-3 mb-3">
              <p className="text-sm text-muted-foreground italic">
                "Hoy me sentí más tranquila después de la clase de yoga. Quiero seguir practicando mindfulness."
              </p>
              <p className="text-xs text-muted-foreground mt-2">Ayer, 18:30</p>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Agregar nota del día
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">📊</span>
              Tu progreso semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Lun</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-2 flex items-center justify-center text-xs">😊</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mar</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-1 flex items-center justify-center text-xs">😐</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mié</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-2 flex items-center justify-center text-xs">😊</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Jue</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-2 flex items-center justify-center text-xs">😄</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Vie</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs">😊</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
