import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
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

        {/* Login Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">Iniciar sesión como profesional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo institucional</Label>
              <Input id="email" type="email" placeholder="profesional@universidad.edu" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="Tu contraseña segura" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <select id="department" className="w-full h-11 px-3 rounded-md border border-input bg-background">
                <option value="">Selecciona tu departamento</option>
                <option value="psychology">Psicología</option>
                <option value="wellness">Bienestar Estudiantil</option>
                <option value="counseling">Consejería</option>
                <option value="medical">Servicios Médicos</option>
              </select>
            </div>

            <Button asChild className="w-full h-11 mt-6">
              <Link href="/admin/dashboard">Acceder al panel</Link>
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              <p>¿Problemas para acceder? Contacta al administrador del sistema</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-0 shadow-sm bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div>
                <h3 className="font-medium text-sm text-primary">Acceso seguro</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Este portal maneja información confidencial de estudiantes. Tu sesión está protegida y monitoreada.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
