"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


  
  

 
interface CreateSurveyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Question {
  id: string
  text: string
  type: "open" | "closed"
  options?: string[]
}



export function CreateSurveyModal({ open, onOpenChange }: CreateSurveyModalProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
  })
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    type: "open" as "open" | "closed",
    options: [""],
  })

  const handleSurveyDataChange = (field: string, value: string) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }))
  }

  const handleQuestionChange = (field: string, value: string) => {
    setCurrentQuestion((prev) => ({ ...prev, [field]: value }))
  }

  const addOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }))
  }

  const updateOption = (index: number, value: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }))
  }

  const removeOption = (index: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }))
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: currentQuestion.text,
      type: currentQuestion.type,
      options: currentQuestion.type === "closed" ? currentQuestion.options.filter((opt) => opt.trim()) : undefined,
    }
    setQuestions((prev) => [...prev, newQuestion])
    setCurrentQuestion({
      text: "",
      type: "open",
      options: [""],
    })
  }

  // Función para crear la encuesta en el backend
  const createSurveyInBackend = async () => {
    try {

            const token = localStorage.getItem("token")

      const response = await fetch('http://localhost:4000/api/surveys', {
        method: 'POST',
        headers: {
                      "Authorization": `Bearer ${token}`,

          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: surveyData.title,
          descripcion: surveyData.description,
        }),
      })

      if (!response.ok) {
        throw new Error('Error creating survey')
      }
      const result = await response.json()
            console.log(result)

      return result.survey.id // Retorna el ID de la encuesta creada
    } catch (error) {
      console.error('Error creating survey:', error)
      throw error
    }
  }

  // Función para crear una pregunta en el backend
  const createQuestionInBackend = async (surveyId: number, question: Question) => {
    try {
                    const token = localStorage.getItem("token")

       const questionType = question.type === "open" ? 1 : 2;

      const response = await fetch('http://localhost:4000/api/questions', {

        method: 'POST',
        headers: {
                  "Authorization": `Bearer ${token}`,

          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idEncuesta: surveyId,
          texto: question.text,
          idTipoPregunta: questionType,
        }),
      })

      if (!response.ok) {
        throw new Error('Error creating question')
      }

      const result = await response.json()
      return result.question.id // Retorna el ID de la pregunta creada
    } catch (error) {
      console.error('Error creating question:', error)
      throw error
    }
  }

  // Función para crear una opción de respuesta en el backend
  const createAnswerOptionInBackend = async (questionId: number, optionText: string, value: number = 0) => {
                        const token = localStorage.getItem("token")

    try {
      const response = await fetch('http://localhost:4000/api/option-answers', {
        method: 'POST',
        headers: {
                "Authorization": `Bearer ${token}`,

          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: questionId,
          text: optionText,
          value: value,
        }),
      })

      if (!response.ok) {
        throw new Error('Error creating answer option')
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error('Error creating answer option:', error)
      throw error
    }
  }

  const finishSurvey = async () => {
    setIsLoading(true)
    
    try {
      // Agregar pregunta actual si existe
      let allQuestions = [...questions]
      if (currentQuestion.text.trim()) {
        const newQuestion: Question = {
          id: Date.now().toString(),
          text: currentQuestion.text,
          type: currentQuestion.type,
          options: currentQuestion.type === "closed" ? currentQuestion.options.filter((opt) => opt.trim()) : undefined,
        }
        allQuestions.push(newQuestion)
      }

      // 1. Crear la encuesta
      console.log('Creating survey...')
      const surveyId = await createSurveyInBackend()
      console.log('Survey created with ID:', surveyId)

      // 2. Crear las preguntas
      for (const question of allQuestions) {
        console.log('Creating question:', question.text)
        const questionId = await createQuestionInBackend(surveyId, question)
        console.log('Question created with ID:', questionId)

        // 3. Si es pregunta cerrada, crear las opciones de respuesta
        if (question.type === "closed" && question.options) {
          console.log('Creating answer options for question:', questionId)
          
          for (let i = 0; i < question.options.length; i++) {
            const optionText = question.options[i]
            if (optionText.trim()) {
              // Puedes asignar valores diferentes a cada opción si lo necesitas
              const optionValue = i + 1 // Por ejemplo, la primera opción vale 1, la segunda 2, etc.
              
              console.log('Creating answer option:', optionText)
              await createAnswerOptionInBackend(questionId, optionText, optionValue)
            }
          }
        }
      }

      console.log('Survey creation completed successfully!')
      
      // Mostrar mensaje de éxito
      alert('¡Encuesta creada exitosamente!')

      // Reset form and close modal
      resetModal()
      onOpenChange(false)

    } catch (error) {
      console.error('Error creating survey:', error)
      alert('Error al crear la encuesta. Por favor, intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetModal = () => {
    setStep(1)
    setSurveyData({ title: "", description: "" })
    setQuestions([])
    setCurrentQuestion({ text: "", type: "open", options: [""] })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen && !isLoading) resetModal()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Crear Nueva Encuesta" : "Agregar Pregunta"}
            {isLoading && " - Creando..."}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la encuesta</Label>
              <Input
                id="title"
                placeholder="Ej: Evaluación de bienestar semanal"
                value={surveyData.title}
                onChange={(e) => handleSurveyDataChange("title", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe el propósito de esta encuesta..."
                value={surveyData.description}
                onChange={(e) => handleSurveyDataChange("description", e.target.value)}
                className="min-h-[100px]"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!surveyData.title.trim() || !surveyData.description.trim() || isLoading}
              >
                Siguiente
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Survey Info Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{surveyData.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{surveyData.description}</p>
              </CardHeader>
              {questions.length > 0 && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    {questions.length} pregunta{questions.length !== 1 ? "s" : ""} agregada
                    {questions.length !== 1 ? "s" : ""}
                  </p>
                </CardContent>
              )}
            </Card>

            {/* Loading indicator */}
            {isLoading && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-700">Creando encuesta, por favor espera...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Question Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Pregunta</Label>
                <Textarea
                  id="question"
                  placeholder="Escribe tu pregunta aquí..."
                  value={currentQuestion.text}
                  onChange={(e) => handleQuestionChange("text", e.target.value)}
                  className="min-h-[80px]"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="questionType">Tipo de pregunta</Label>
                <Select
                  value={currentQuestion.type}
                  onValueChange={(value: "open" | "closed") => {
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      type: value,
                      options: value === "closed" ? [""] : [],
                    }))
                  }}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Abierta</SelectItem>
                    <SelectItem value="closed">Cerrada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentQuestion.type === "closed" && (
                <div className="space-y-3">
                  <Label>Opciones de respuesta</Label>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Opción ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        disabled={isLoading}
                      />
                      {currentQuestion.options.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeOption(index)} 
                          className="px-3"
                          disabled={isLoading}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addOption} 
                    className="w-full bg-transparent"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Agregar opción
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(1)} disabled={isLoading}>
                Volver
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={addQuestion}
                  disabled={
                    isLoading ||
                    !currentQuestion.text.trim() ||
                    (currentQuestion.type === "closed" &&
                      currentQuestion.options.filter((opt) => opt.trim()).length < 2)
                  }
                >
                  Agregar otra pregunta
                </Button>
                <Button
                  onClick={finishSurvey}
                  disabled={
                    isLoading ||
                    !currentQuestion.text.trim() ||
                    (currentQuestion.type === "closed" &&
                      currentQuestion.options.filter((opt) => opt.trim()).length < 2)
                  }
                >
                  {isLoading ? "Creando..." : "Finalizar encuesta"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}