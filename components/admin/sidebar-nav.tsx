"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface AdminSidebarNavProps {
  collapsed?: boolean
  onToggle?: (collapsed: boolean) => void
}

export function AdminSidebarNav({ collapsed = false, onToggle }: AdminSidebarNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Panel Principal",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
    },
    {
      href: "/admin/students",
      label: "Estudiantes",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      href: "/admin/alerts",
      label: "Notificaciones",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM4.868 19.718A10.97 10.97 0 0112 22a10.97 10.97 0 017.132-2.282M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z"
          />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => onToggle?.(true)} />}

      <div
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border z-50 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } ${collapsed ? "md:relative" : "md:relative"}`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md md:flex hidden"
          onClick={() => onToggle?.(!collapsed)}
        >
          <svg
            className={`w-3 h-3 transition-transform ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        {/* Mobile toggle button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 z-10 md:hidden"
          onClick={() => onToggle?.(true)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>

        {/* Header */}
        <div className={`p-6 border-b border-border ${collapsed ? "p-4" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold">Panel Profesional</h2>
                <p className="text-sm text-muted-foreground">Bienestar Estudiantil</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full ${collapsed ? "justify-center px-2" : "justify-start gap-3"} h-11 ${
                    isActive ? "" : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!collapsed && item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className={`p-4 border-t border-border ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">DR</span>
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Dra. Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Psicología</p>
                </div>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
