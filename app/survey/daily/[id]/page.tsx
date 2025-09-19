"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import Link from "next/link"

// Tipos de datos
interface Survey {
  id: number
  titulo: string
  descripcion: string
}

interface Question {
  id: number
  texto: string
  idTipoPregunta: number // 1 = abierta, 2 = múltiple
  idEncuesta: number
}

interface Option {
  id: number
  opcion: string
  valor: number
  preguntaId: number
}

interface QuestionWithOptions extends Question {
  opciones?: Option[]
}

export default function DynamicSurveyPage() {
  const params = useParams()
  const surveyId = params?.id as string
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("userId")

  // Estados
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [questions, setQuestions] = useState<QuestionWithOptions[]>([])
  const [responses, setResponses] = useState<Record<number, { respuesta: string; valor: number }>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Función para obtener la encuesta
  const fetchSurvey = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/surveys/${surveyId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) throw new Error('Error al cargar la encuesta')
      const surveyData = await response.json()
      setSurvey(surveyData)
    } catch (err) {
      setError('No se pudo cargar la encuesta')
      console.error('Error fetching survey:', err)
    }
  }

  // Función para obtener las preguntas
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/questionsBySurveyId/${surveyId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) throw new Error('Error al cargar las preguntas')
      const questionsData = await response.json()
      console.log( questionsData);
      // Para cada pregunta, si es de tipo múltiple (2), obtener las opciones
      const questionsWithOptions = await Promise.all(
        questionsData.map(async (question: Question) => {
          if (question.idTipoPregunta === 2) {
            try {
              const optionsResponse = await fetch(`http://localhost:4000/api/option-answers/by-question/${question.id}`, {
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              if (optionsResponse.ok) {

                const options = await optionsResponse.json()
                console.log(optionsResponse)
                return { ...question, opciones: options }
              }
            } catch (err) {
              console.error(`Error fetching options for question ${question.id}:`, err)
            }
          }
          return question
        })
      )
      
      setQuestions(questionsWithOptions)
    } catch (err) {
      setError('No se pudieron cargar las preguntas')
      console.error('Error fetching questions:', err)
    }
  }

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    if (surveyId) {
      const loadData = async () => {
        setLoading(true)
        await Promise.all([fetchSurvey(), fetchQuestions()])
        setLoading(false)
      }
      loadData()
    }
  }, [surveyId])

  // Función para manejar cambios en las respuestas
  const handleResponseChange = (questionId: number, value: string, responseValue: number = 0) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        respuesta: value,
        valor: responseValue
      }
    }))
  }

  // Función para enviar las respuestas
  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      // Formatear las respuestas para envío
      const formattedResponses = Object.entries(responses).map(([questionId, responseData]) => ({
        encuestaId: parseInt(surveyId),
        preguntaId: parseInt(questionId),
        respuesta: responseData.respuesta,
        valor: responseData.valor
      }))

      const response = await fetch('http://localhost:4000/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          responses: formattedResponses
        })
      })

      if (response.ok) {
        // Redirigir o mostrar mensaje de éxito
        alert('Respuestas guardadas exitosamente')
      } else {
        throw new Error('Error al guardar las respuestas')
      }
    } catch (err) {
      console.error('Error submitting survey:', err)
      alert('Error al guardar las respuestas. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  // Verificar si todas las preguntas han sido respondidas
  const isFormComplete = questions.every(question => 
    responses[question.id] && responses[question.id].respuesta.trim() !== ''
  )

  // Renderizar pregunta abierta
  const renderOpenQuestion = (question: QuestionWithOptions) => (
    <Card key={question.id} className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">
          {question.texto}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Escribe tu respuesta aquí..."
          value={responses[question.id]?.respuesta || ''}
          onChange={(e) => handleResponseChange(question.id, e.target.value, 0)}
          className="min-h-[100px] resize-none"
        />
      </CardContent>
    </Card>
  )

  // Renderizar pregunta múltiple
  const renderMultipleChoiceQuestion = (question: QuestionWithOptions) => (
    <Card key={question.id} className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">
          {question.texto}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={responses[question.id]?.respuesta || ''}
          onValueChange={(value) => {
            // Encontrar la opción seleccionada para obtener su valor
            const selectedOption = question.opciones?.find(option => option.id.toString() === value)
            if (selectedOption) {
              handleResponseChange(question.id, selectedOption.opcion, selectedOption.valor)
            }
          }}
          className="space-y-3"
        >
          {question.opciones?.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option.id.toString()} 
                id={`option-${option.id}`} 
              />
              <Label 
                htmlFor={`option-${option.id}`} 
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {option.opcion}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando encuesta...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center pb-20">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Link href="/survey">
            <Button variant="outline">Volver a encuestas</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Link href="/survey">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">{survey?.titulo}</h1>
            <p className="text-primary-foreground/80 text-sm">{survey?.descripcion}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Renderizar preguntas dinámicamente */}
        {questions.map((question) => {
          switch (question.idTipoPregunta) {
            case 1: // Pregunta abierta
              return renderOpenQuestion(question)
            case 2: // Pregunta múltiple
              return renderMultipleChoiceQuestion(question)
            default:
              return null
          }
        })}

        {/* Submit Button */}
        {questions.length > 0 && (
          <div className="space-y-3">
            <Button
              className="w-full h-12 text-base"
              disabled={!isFormComplete || submitting}
              onClick={handleSubmit}
            >
              {submitting ? 'Guardando...' : 'Guardar respuestas'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Tus respuestas son privadas y solo las verás tú y el equipo de bienestar si necesitas apoyo.
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}