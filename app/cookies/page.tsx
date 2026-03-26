import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Información sobre el uso de cookies en staffdigital.ai conforme a la LSSI-CE y el RGPD.",
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
      </div>
      <GlassmorphismNav />
      <div className="relative z-10 pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-6 sm:px-8 prose prose-invert prose-sm">
          <h1 className="text-3xl font-bold mb-2">Política de Cookies</h1>
          <p className="text-muted-foreground text-sm mb-8">Ultima actualizacion: 24 de marzo de 2026</p>

          <h2>1. Que son las Cookies</h2>
          <p>Las cookies son pequenos archivos de texto que los sitios web almacenan en tu navegador. Permiten recordar preferencias, analizar el uso del sitio y ofrecer una mejor experiencia de navegacion.</p>

          <h2>2. Cookies que Utilizamos</h2>

          <h3>2.1 Cookies Estrictamente Necesarias</h3>
          <p>Son esenciales para el funcionamiento del sitio web. No requieren consentimiento.</p>
          <table>
            <thead>
              <tr><th>Cookie</th><th>Proveedor</th><th>Finalidad</th><th>Duracion</th></tr>
            </thead>
            <tbody>
              <tr><td>__cf_bm</td><td>Cloudflare</td><td>Proteccion contra bots y DDoS</td><td>30 min</td></tr>
              <tr><td>cf_clearance</td><td>Cloudflare</td><td>Verificacion de seguridad</td><td>30 min</td></tr>
              <tr><td>cw_conversation</td><td>Chatwoot</td><td>Sesion del chat en vivo</td><td>Sesion</td></tr>
              <tr><td>cw_user</td><td>Chatwoot</td><td>Identificacion del usuario del chat</td><td>1 ano</td></tr>
            </tbody>
          </table>

          <h3>2.2 Cookies Analiticas</h3>
          <p>Nos ayudan a entender como los visitantes interactuan con el sitio. Requieren consentimiento previo.</p>
          <table>
            <thead>
              <tr><th>Cookie</th><th>Proveedor</th><th>Finalidad</th><th>Duracion</th></tr>
            </thead>
            <tbody>
              <tr><td>_ga</td><td>Google Analytics</td><td>Distinguir usuarios unicos</td><td>2 anos</td></tr>
              <tr><td>_ga_*</td><td>Google Analytics</td><td>Mantener estado de sesion</td><td>2 anos</td></tr>
              <tr><td>_gid</td><td>Google Analytics</td><td>Distinguir usuarios (24h)</td><td>24 horas</td></tr>
              <tr><td>_gat_gtag_*</td><td>Google Tag Manager</td><td>Limitar tasa de peticiones</td><td>1 min</td></tr>
            </tbody>
          </table>

          <h3>2.3 Cookies de Rendimiento</h3>
          <table>
            <thead>
              <tr><th>Cookie</th><th>Proveedor</th><th>Finalidad</th><th>Duracion</th></tr>
            </thead>
            <tbody>
              <tr><td>__vercel_speed_insights</td><td>Vercel</td><td>Metricas de rendimiento web</td><td>Sesion</td></tr>
            </tbody>
          </table>

          <h2>3. Como Gestionar las Cookies</h2>
          <p>Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que la desactivacion de algunas cookies puede afectar a la funcionalidad del sitio.</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary">Microsoft Edge</a></li>
          </ul>

          <h2>4. Google Analytics y Google Tag Manager</h2>
          <p>Utilizamos Google Analytics 4 a traves de Google Tag Manager (GTM-MDB34SRP) para recopilar información anonima sobre el uso del sitio web. Google Analytics almacena la información recopilada en sus servidores en EE.UU., amparado por el EU-US Data Privacy Framework.</p>
          <p>Puedes desactivar Google Analytics instalando el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary">complemento de inhabilitacion de Google Analytics</a>.</p>

          <h2>5. Base Legal</h2>
          <ul>
            <li><strong>Cookies necesarias:</strong> Art. 6.1.f RGPD — Interes legitimo (funcionamiento del sitio).</li>
            <li><strong>Cookies analiticas y de rendimiento:</strong> Art. 6.1.a RGPD — Consentimiento del usuario.</li>
          </ul>
          <p>Conforme al articulo 22.2 de la LSSI-CE (modificado por el RD-ley 13/2012), las cookies analiticas solo se instalan con tu consentimiento previo e informado.</p>

          <h2>6. Actualizaciones</h2>
          <p>Esta politica puede actualizarse en funcion de cambios normativos o de la incorporacion de nuevas herramientas. La fecha de ultima actualizacion se indica al inicio del documento.</p>
        </article>
      </div>
      <Footer />
    </main>
  )
}
