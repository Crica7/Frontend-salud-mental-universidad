import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* University Logo and Branding */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Universidad Bienestar</h1>
            <p className="text-sm text-muted-foreground">Tu salud mental importa</p>
          </div>
        </div>

        {/* Welcome Message */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-xl font-semibold text-card-foreground">Bienvenido a tu espacio de bienestar</h2>
            <p className="text-muted-foreground leading-relaxed">
              Acompañamos tu crecimiento personal y académico con herramientas para cuidar tu salud mental y emocional.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full h-12 text-base font-medium">
            <Link href="/register">Crear cuenta</Link>
          </Button>

          <Button asChild variant="outline" className="w-full h-12 text-base bg-transparent">
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Alineado con el ODS 3: Salud y Bienestar</p>
        </div>
      </div>
    </div>
  )
}
