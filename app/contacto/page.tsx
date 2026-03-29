import type { Metadata } from "next"
import { ContactClient } from "./contact-client"

export const metadata: Metadata = {
  title: "Contacto | StaffDigital AI",
  description:
    "Contacta con StaffDigital AI. Oficinas en Barcelona y Lisboa. Llámanos, escríbenos por WhatsApp o rellena el formulario.",
  openGraph: {
    title: "Contacto | StaffDigital AI",
    description: "Oficinas en Barcelona y Lisboa. Contacta con nuestro equipo.",
  },
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <ContactClient />
    </main>
  )
}
