"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { Check, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useChatwoot } from "@/lib/use-chatwoot"

// Context for modal control
interface FormModalContextType {
  openContactForm: () => void
  openBudgetForm: () => void
}

const FormModalContext = createContext<FormModalContextType | null>(null)

export function useFormModals() {
  const context = useContext(FormModalContext)
  if (!context) {
    throw new Error("useFormModals must be used within FormModalProvider")
  }
  return context
}

// Provider component
export function FormModalProvider({ children }: { children: ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false)
  const [budgetOpen, setBudgetOpen] = useState(false)

  const openContactForm = () => setContactOpen(true)
  const openBudgetForm = () => setBudgetOpen(true)

  return (
    <FormModalContext.Provider value={{ openContactForm, openBudgetForm }}>
      {children}
      <ContactFormModal open={contactOpen} onOpenChange={setContactOpen} />
      <BudgetFormModal open={budgetOpen} onOpenChange={setBudgetOpen} />
    </FormModalContext.Provider>
  )
}

// Contact Form Modal (Habla con un Experto)
function ContactFormModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { submit, isLoading, error, success, reset } = useChatwoot()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submit("consulta", formData)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after closing
    setTimeout(() => {
      reset()
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        mensaje: "",
      })
    }, 300)
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-slate-900 border-white/20 text-white sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <DialogTitle className="text-xl font-semibold text-white mb-2">
              Gracias por contactarnos
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Nuestro equipo te contactara en breve.
            </DialogDescription>
            <Button
              onClick={handleClose}
              className="mt-6 bg-white text-black hover:bg-white/90 rounded-full px-6"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-white/20 text-white sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Habla con un Experto
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Completa el formulario y nuestro equipo te contactara.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-nombre" className="text-white/80">
                Nombre *
              </Label>
              <Input
                id="contact-nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder="Tu nombre"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-white/80">
                Email *
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-telefono" className="text-white/80">
                Telefono
              </Label>
              <Input
                id="contact-telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder="+34 600 000 000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-empresa" className="text-white/80">
                Empresa
              </Label>
              <Input
                id="contact-empresa"
                value={formData.empresa}
                onChange={(e) =>
                  setFormData({ ...formData, empresa: e.target.value })
                }
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder="Nombre de tu empresa"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-mensaje" className="text-white/80">
              Mensaje *
            </Label>
            <Textarea
              id="contact-mensaje"
              value={formData.mensaje}
              onChange={(e) =>
                setFormData({ ...formData, mensaje: e.target.value })
              }
              required
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 min-h-[100px]"
              placeholder="Cuentanos como podemos ayudarte..."
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              Error: {error}. Por favor, intentalo de nuevo.
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-white/90 rounded-full py-6 text-base font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Mensaje"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Budget Form Modal (Pedir Presupuesto)
function BudgetFormModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { submit, isLoading, error, success, reset } = useChatwoot()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    servicio: "",
    presupuesto: "",
    descripcion: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submit("presupuesto", formData)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after closing
    setTimeout(() => {
      reset()
      setFormData({
        nombre: "",
        email: "",
        empresa: "",
        servicio: "",
        presupuesto: "",
        descripcion: "",
      })
    }, 300)
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-slate-900 border-white/20 text-white sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <DialogTitle className="text-xl font-semibold text-white mb-2">
              Solicitud Recibida
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Nuestro equipo te contactara en breve con tu presupuesto personalizado.
            </DialogDescription>
            <Button
              onClick={handleClose}
              className="mt-6 bg-white text-black hover:bg-white/90 rounded-full px-6"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-white/20 text-white sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Pedir Presupuesto
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Completa el formulario para recibir un presupuesto personalizado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget-nombre" className="text-white/80">
                Nombre *
              </Label>
              <Input
                id="budget-nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder="Tu nombre"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget-email" className="text-white/80">
                Email *
              </Label>
              <Input
                id="budget-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-empresa" className="text-white/80">
              Empresa
            </Label>
            <Input
              id="budget-empresa"
              value={formData.empresa}
              onChange={(e) =>
                setFormData({ ...formData, empresa: e.target.value })
              }
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
              placeholder="Nombre de tu empresa"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget-servicio" className="text-white/80">
                Servicio de interes *
              </Label>
              <select
                id="budget-servicio"
                value={formData.servicio}
                onChange={(e) =>
                  setFormData({ ...formData, servicio: e.target.value })
                }
                required
                className="w-full h-9 rounded-md border border-white/20 bg-white/5 px-3 text-white text-sm focus:border-white/40 outline-none"
              >
                <option value="" className="bg-slate-900">Selecciona un servicio</option>
                <option value="ia-conversacional" className="bg-slate-900">IA Conversacional</option>
                <option value="automatizacion-omnicanal" className="bg-slate-900">Automatizacion Omnicanal</option>
                <option value="seguridad-ia" className="bg-slate-900">Seguridad IA</option>
                <option value="home-staging-ia" className="bg-slate-900">Home Staging IA</option>
                <option value="otro" className="bg-slate-900">Otro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget-presupuesto" className="text-white/80">
                Presupuesto estimado
              </Label>
              <select
                id="budget-presupuesto"
                value={formData.presupuesto}
                onChange={(e) =>
                  setFormData({ ...formData, presupuesto: e.target.value })
                }
                className="w-full h-9 rounded-md border border-white/20 bg-white/5 px-3 text-white text-sm focus:border-white/40 outline-none"
              >
                <option value="" className="bg-slate-900">Selecciona un rango</option>
                <option value="menos-500" className="bg-slate-900">Menos de 500 EUR/mes</option>
                <option value="500-1000" className="bg-slate-900">500 - 1.000 EUR/mes</option>
                <option value="1000-2500" className="bg-slate-900">1.000 - 2.500 EUR/mes</option>
                <option value="2500-5000" className="bg-slate-900">2.500 - 5.000 EUR/mes</option>
                <option value="mas-5000" className="bg-slate-900">Mas de 5.000 EUR/mes</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-descripcion" className="text-white/80">
              Descripcion del proyecto
            </Label>
            <Textarea
              id="budget-descripcion"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 min-h-[100px]"
              placeholder="Describe brevemente tu proyecto o necesidades..."
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              Error: {error}. Por favor, intentalo de nuevo.
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-white/90 rounded-full py-6 text-base font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              "Solicitar Presupuesto"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
