"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import Link from "next/link"

interface Survey {
  id: number
  title: string
  description: string
  type: string
  completedToday: boolean
  createdAt?: string
}

export default function SurveyPage() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener las encuestas desde la API
  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")

      if (!token) {
        setError("No se encontró token de autenticación")
        return
      }

      const response = await fetch('http://localhost:4000/api/surveys', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Error al cargar las encuestas')
      }

      const result = await response.json();
console.log(result);

// Verificamos que sea un array
if (Array.isArray(result)) {
  const mappedSurveys = result.map((survey: any) => ({
    id: survey.id,
    title: survey.title || survey.titulo,
    description: survey.description || survey.descripcion,
    type: "general",
    completedToday: !Boolean(survey.estado || false),
    createdAt: survey.fecha_creacion || new Date().toISOString(),
  }));

  setSurveys(mappedSurveys);
} else {
  setError("Error al cargar las encuestas");
}
    } catch (error) {
      console.error('Error fetching surveys:', error)
      setError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  // Cargar las encuestas al montar el componente
  useEffect(() => {
    fetchSurveys()
  }, [])

  // Función para determinar el tipo en español
  const getTypeInSpanish = (type: string) => {
    switch (type.toLowerCase()) {
      case "daily":
        return "Diaria"
      case "weekly":
        return "Semanal"
      case "academic":
        return "Académica"
      case "bienestar":
        return "Bienestar"
      case "estres":
        return "Estrés"
      default:
        return "General"
    }
  }

  // Función para recargar las encuestas
  const handleRefresh = () => {
    setLoading(true)
    setError(null)
    fetchSurveys()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Encuestas</h1>
              <p className="text-primary-foreground/80 text-sm">Cargando encuestas...</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando encuestas...</p>
            </CardContent>
          </Card>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Encuestas</h1>
              <p className="text-primary-foreground/80 text-sm">Error al cargar</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Card className="border-0 shadow-sm border-red-200 bg-red-50">
            <CardContent className="text-center py-12">
              <div className="text-red-600">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg font-medium mb-2">Error al cargar encuestas</p>
                <p className="text-sm mb-4">{error}</p>
                <Button onClick={handleRefresh} variant="outline" className="bg-white">
                  Intentar de nuevo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Encuestas</h1>
            <p className="text-primary-foreground/80 text-sm">
              {surveys.length} encuesta{surveys.length !== 1 ? "s" : ""} disponible{surveys.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{survey.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">{survey.description}</p>
                </div>
                {survey.completedToday && (
                  <div className="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Completada
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Tipo: {getTypeInSpanish(survey.type)}
                </div>
                <Link href={survey.id !== 1 ? "/survey/daily" : `/survey/${survey.id}`}>
                  <Button 
                    size="sm" 
                    variant={survey.completedToday ? "outline" : "default"}
                  >
                    {survey.completedToday ? "Ver respuestas" : "Responder"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty state if no surveys */}
        {surveys.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg font-medium">No hay encuestas disponibles</p>
                <p className="text-sm mt-1">Las encuestas aparecerán aquí cuando estén activas</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}