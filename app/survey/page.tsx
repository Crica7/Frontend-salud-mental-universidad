"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BottomNavigation } from "@/components/navigation/bottom-nav"
import Link from "next/link"

export default function SurveyPage() {
  const [responses, setResponses] = useState({
    mood: 0,
    energy: 0,
    sleep: 0,
    stress: 0,
    notes: "",
  })

  const handleRatingChange = (category: string, rating: number) => {
    setResponses((prev) => ({ ...prev, [category]: rating }))
  }

  const StarRating = ({ category, value, label }: { category: string; value: number; label: string }) => (
    <div className="space-y-3">
      <h3 className="font-medium text-center">{label}</h3>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(category, star)}
            className={`w-10 h-10 rounded-full transition-colors ${
              star <= value ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"
            }`}
          >
            <span className="text-lg">{star <= value ? "⭐" : "☆"}</span>
          </button>
        ))}
      </div>
    </div>
  )

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
            <h1 className="text-xl font-semibold">Encuesta diaria</h1>
            <p className="text-primary-foreground/80 text-sm">Comparte cómo te sientes hoy</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Mood Assessment */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <span className="text-2xl">😊</span>
              ¿Cómo está tu ánimo hoy?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StarRating category="mood" value={responses.mood} label="Estado de ánimo general" />
          </CardContent>
        </Card>

        {/* Energy Level */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <span className="text-2xl">⚡</span>
              ¿Cómo está tu energía?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StarRating category="energy" value={responses.energy} label="Nivel de energía" />
          </CardContent>
        </Card>

        {/* Sleep Quality */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <span className="text-2xl">😴</span>
              ¿Cómo dormiste anoche?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StarRating category="sleep" value={responses.sleep} label="Calidad del sueño" />
          </CardContent>
        </Card>

        {/* Stress Level */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <span className="text-2xl">🧘</span>
              ¿Cómo está tu nivel de estrés?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StarRating category="stress" value={responses.stress} label="Nivel de estrés (1 = muy bajo, 5 = muy alto)" />
          </CardContent>
        </Card>

        {/* Personal Notes */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <span className="text-2xl">📝</span>
              Notas del día (opcional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="¿Hay algo especial que quieras recordar sobre hoy? Comparte tus pensamientos, logros o desafíos..."
              value={responses.notes}
              onChange={(e) => setResponses((prev) => ({ ...prev, notes: e.target.value }))}
              className="min-h-[100px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 text-base"
            disabled={!responses.mood || !responses.energy || !responses.sleep || !responses.stress}
          >
            Guardar respuestas
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Tus respuestas son privadas y solo las verás tú y el equipo de bienestar si necesitas apoyo.
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
