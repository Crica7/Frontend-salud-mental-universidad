"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = isRegistering ? "http://localhost:4000/api/professionals/register" : "http://localhost:4000/api/professionals/login"
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Error en la autenticación")
      }

      const data = await res.json()

      if (!isRegistering) {
        // Guardar token en localStorage (o cookie si prefieres)
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId", JSON.stringify(data.id))

        // Redirigir al dashboard
        router.push("/admin/dashboard") 
      } else {
        alert("✅ Registro exitoso, ahora puedes iniciar sesión")
        setIsRegistering(false)
      }
    } catch (err: any) {
      setError(err.message || "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-primary/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </Link>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Portal Profesional</h1>
            <p className="text-sm text-muted-foreground">Acceso exclusivo para el equipo de bienestar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {!isRegistering ? (
            /* Login Form */
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-center">Iniciar sesión como profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="correo">Correo institucional</Label>
                  <Input id="correo" type="email" placeholder="profesional@universidad.edu" className="h-11" onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contrasena">Contraseña</Label>
                  <Input id="contrasena" type="password" placeholder="Tu contraseña segura" className="h-11" onChange={handleChange} />
                </div>

                <Button type="submit" disabled={loading} className="w-full h-11 mt-6">
                  {loading ? "Cargando..." : "Acceder al panel"}
                </Button>

                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              </CardContent>
            </Card>
          ) : (
            /* Registration Form */
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-center">Registro de profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombres</Label>
                  <Input id="nombre" type="text" placeholder="Tus nombres" className="h-11" onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellidos</Label>
                  <Input id="apellido" type="text" placeholder="Tus apellidos" className="h-11" onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo">Correo</Label>
                  <Input id="correo" type="email" placeholder="profesional@universidad.edu" className="h-11" onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contrasena">Contraseña</Label>
                  <Input id="contrasena" type="password" placeholder="Tu contraseña segura" className="h-11" onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirma tu contraseña" className="h-11" onChange={handleChange} />
                </div>

                <Button type="submit" disabled={loading} className="w-full h-11 mt-6">
                  {loading ? "Creando cuenta..." : "Crear cuenta profesional"}
                </Button>

                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              </CardContent>
            </Card>
          )}
        </form>

        {/* Toggle between Login/Register */}
        <div className="text-center text-sm">
          {!isRegistering ? (
            <>
              <span className="text-muted-foreground">¿Necesitas crear una cuenta profesional? </span>
              <button type="button" onClick={() => setIsRegistering(true)} className="text-primary hover:underline font-medium">
                Regístrate aquí
              </button>
            </>
          ) : (
            <>
              <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
              <button type="button" onClick={() => setIsRegistering(false)} className="text-primary hover:underline font-medium">
                Inicia sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}