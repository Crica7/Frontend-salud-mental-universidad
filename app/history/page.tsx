import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import { Badge } from "@/components/ui/badge"

export default function HistoryPage() {
  const weeklyData = [
    { day: "Lun", mood: 4, energy: 3, sleep: 4, stress: 2 },
    { day: "Mar", mood: 3, energy: 4, sleep: 3, stress: 3 },
    { day: "Mié", mood: 4, energy: 4, sleep: 5, stress: 4 },
    { day: "Jue", mood: 5, energy: 5, sleep: 4, stress: 4 },
    { day: "Vie", mood: 4, energy: 4, sleep: 4, stress: 3 },
    { day: "Sáb", mood: 5, energy: 3, sleep: 5, stress: 5 },
    { day: "Dom", mood: 4, energy: 4, sleep: 4, stress: 4 },
  ]

  const getMoodEmoji = (rating: number) => {
    const emojis = ["😢", "😐", "🙂", "😊", "😄"]
    return emojis[rating - 1] || "😐"
  }

  const getBarHeight = (value: number) => `${(value / 5) * 100}%`

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Tu historial</h1>
          <p className="text-primary-foreground/80 text-sm">Revisa tu progreso y evolución</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Time Period Selector */}
        <div className="flex gap-2 justify-center">
          <Button variant="default" size="sm" className="rounded-full">
            Esta semana
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            Este mes
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            3 meses
          </Button>
        </div>

        {/* Weekly Summary */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">📊</span>
              Resumen semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">4.1</p>
                <p className="text-sm text-muted-foreground">Ánimo promedio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">7.2h</p>
                <p className="text-sm text-muted-foreground">Sueño promedio</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-2">3.9</p>
                <p className="text-sm text-muted-foreground">Energía promedio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-1">3.6</p>
                <p className="text-sm text-muted-foreground">Manejo del estrés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">📈</span>
              Evolución semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chart Legend */}
              <div className="flex flex-wrap gap-4 justify-center text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span>Ánimo</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-secondary rounded"></div>
                  <span>Energía</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-chart-2 rounded"></div>
                  <span>Sueño</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-chart-1 rounded"></div>
                  <span>Estrés</span>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between h-32 gap-1">
                {weeklyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-1 h-24">
                      <div className="flex gap-0.5 items-end h-full">
                        <div className="w-1.5 bg-primary rounded-t" style={{ height: getBarHeight(data.mood) }}></div>
                        <div
                          className="w-1.5 bg-secondary rounded-t"
                          style={{ height: getBarHeight(data.energy) }}
                        ></div>
                        <div className="w-1.5 bg-chart-2 rounded-t" style={{ height: getBarHeight(data.sleep) }}></div>
                        <div className="w-1.5 bg-chart-1 rounded-t" style={{ height: getBarHeight(data.stress) }}></div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{data.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Entries */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">📝</span>
              Entradas recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="text-2xl">{getMoodEmoji(4)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Viernes, 15 Nov</span>
                    <Badge variant="secondary" className="text-xs">
                      Bien
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Día productivo en la universidad. Me sentí más relajada después de hablar con mis amigos."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="text-2xl">{getMoodEmoji(5)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Jueves, 14 Nov</span>
                    <Badge variant="default" className="text-xs">
                      Muy bien
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Excelente día! Terminé mi proyecto y celebré con mis compañeros. Me siento orgullosa."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="text-2xl">{getMoodEmoji(3)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Miércoles, 13 Nov</span>
                    <Badge variant="outline" className="text-xs">
                      Regular
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Día con altibajos. Estrés por los exámenes pero logré mantener la calma."
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              Ver todas las entradas
            </Button>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-xl">💡</span>
              Insights personales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
              <p className="text-sm font-medium text-primary">Progreso positivo</p>
              <p className="text-sm text-muted-foreground">
                Tu estado de ánimo ha mejorado un 20% comparado con la semana pasada.
              </p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg border-l-4 border-secondary">
              <p className="text-sm font-medium text-secondary">Patrón identificado</p>
              <p className="text-sm text-muted-foreground">
                Tiendes a sentirte mejor los fines de semana. Considera aplicar esas actividades entre semana.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
