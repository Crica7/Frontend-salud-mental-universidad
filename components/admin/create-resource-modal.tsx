"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateResourceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateResourceModal({ open, onOpenChange }: CreateResourceModalProps) {
  const [resourceData, setResourceData] = useState({
    title: "",
    description: "",
    type: "",
    url: "",
  })

  const handleChange = (field: string, value: string) => {
    setResourceData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Here you would typically save the resource to your backend
    console.log("Resource created:", resourceData)

    // Reset form and close modal
    setResourceData({
      title: "",
      description: "",
      type: "",
      url: "",
    })
    onOpenChange(false)
  }

  const resetModal = () => {
    setResourceData({
      title: "",
      description: "",
      type: "",
      url: "",
    })
  }

  const isFormValid =
    resourceData.title.trim() && resourceData.description.trim() && resourceData.type && resourceData.url.trim()

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) resetModal()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Recurso</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ej: Técnicas de relajación para estudiantes"
              value={resourceData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe brevemente el contenido del recurso..."
              value={resourceData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resourceType">Tipo de recurso</Label>
            <Select value={resourceData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de recurso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Artículo</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="podcast">Podcast</SelectItem>
                <SelectItem value="guide">Guía</SelectItem>
                <SelectItem value="tool">Herramienta</SelectItem>
                <SelectItem value="exercise">Ejercicio</SelectItem>
                <SelectItem value="meditation">Meditación</SelectItem>
                <SelectItem value="book">Libro</SelectItem>
                <SelectItem value="course">Curso</SelectItem>
                <SelectItem value="app">Aplicación</SelectItem>
                <SelectItem value="website">Sitio web</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://ejemplo.com/recurso"
              value={resourceData.url}
              onChange={(e) => handleChange("url", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Enlace al recurso (artículo, video, herramienta, etc.)</p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              Crear recurso
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
