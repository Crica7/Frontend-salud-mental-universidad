"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    semester: "",
    program: "",
    mail: "",
    password: "",
    confirmPassword: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Manejar cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  // Manejar cambio en select
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      semester: value,
    })
  }

  // Enviar datos al backend
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      setLoading(true)
      setError("")

      const res = await fetch("http://localhost:4000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Error en el registro")
      }

      // Si todo salió bien
      router.push("/login")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="w-12 h-12 mx-auto bg-primary rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </Link>
          <h1 className="text-xl font-semibold text-foreground">Crear cuenta</h1>
          <p className="text-sm text-muted-foreground">Únete a nuestra comunidad de bienestar</p>
        </div>

        {/* Registration Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">Registro de estudiante</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" type="text" placeholder="Tu nombre completo" className="h-11"
                value={formData.name} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellidos</Label>
              <Input id="lastName" type="text" placeholder="Tus apellidos" className="h-11"
                value={formData.lastName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semestre</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecciona tu semestre" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i+1} value={`${i+1}`}>{i+1}° Semestre</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Carrera</Label>
              <Input id="program" type="text" placeholder="Tu carrera universitaria" className="h-11"
                value={formData.program} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mail">Correo institucional</Label>
              <Input id="mail" type="mail" placeholder="estudiante@universidad.edu" className="h-11"
                value={formData.mail} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="Mínimo 8 caracteres" className="h-11"
                value={formData.password} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirma tu contraseña" className="h-11"
                value={formData.confirmPassword} onChange={handleChange} />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button 
              className="w-full h-11 mt-6"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </Button>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
          <Link href="/login" className="text-primary hover:underline font-medium">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}