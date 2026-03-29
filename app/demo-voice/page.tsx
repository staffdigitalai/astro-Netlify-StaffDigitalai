import type { Metadata } from "next"
import { DemoVoiceClient } from "./demo-voice-client"

export const metadata: Metadata = {
  title: "Demo de Voz Humana IA | StaffDigital AI",
  description:
    "Escucha la diferencia. Compara una voz robótica tradicional con nuestra tecnología de voz humana propietaria. Prueba gratis →",
  openGraph: {
    title: "Demo de Voz Humana IA | StaffDigital AI",
    description: "Escucha la diferencia entre voz robótica y voz humana IA.",
  },
}

export default function DemoVoicePage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <DemoVoiceClient />
    </main>
  )
}
