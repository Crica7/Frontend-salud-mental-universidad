"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [noteText, setNoteText] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [answers, setAnswers] = useState<any>(null)

  const [loading, setLoading] = useState(true)


   const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    router.push("/login") 
  }


  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    if (!userId || !token) {
      router.push("/login")
      return
    }

   
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/students/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) throw new Error("Error al obtener usuario")

        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error(err)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
     const fetchAnswers = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/answersByStudent/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) throw new Error("Error al obtener respuestas")

        const data = await res.json()
        setAnswers(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAnswers()

    fetchUser()
  }, [router])

  return(
     
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">¡Hola, {user?.name}!</h1>
            <p className="text-primary-foreground/80 text-sm">¿Cómo te sientes hoy?</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Emotional Check */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Estado emocional de hoy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center gap-2">
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium hover:bg-accent transition-colors">
                1
              </button>
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium hover:bg-accent transition-colors">
                2
              </button>
              <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-sm font-medium text-primary-foreground">
                3
              </button>
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium hover:bg-accent transition-colors">
                4
              </button>
              <button className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium hover:bg-accent transition-colors">
                5
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
              <div className="w-8 h-8 mx-auto mb-2 text-muted-foreground">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-sm">Sueño</h3>
              <p className="text-2xl font-bold text-primary">7.5h</p>
              <p className="text-xs text-muted-foreground">Anoche</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 text-muted-foreground">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
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
              <div className="w-5 h-5 text-muted-foreground">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
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
              <div className="w-5 h-5 text-muted-foreground">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full bg-transparent">
                  Agregar nota del día
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Agregar nota personal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="note">¿Cómo te sientes hoy?</Label>
                    <Textarea
                      id="note"
                      placeholder="Escribe tus pensamientos y sentimientos..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-5 h-5 text-muted-foreground">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              Tu progreso semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Lun</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-2 flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mar</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-1 flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mié</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-2 flex items-center justify-center text-xs font-medium">
                    4
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Jue</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-chart-2 flex items-center justify-center text-xs font-medium">
                    4
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Vie</span>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
                    3
                  </div>
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
