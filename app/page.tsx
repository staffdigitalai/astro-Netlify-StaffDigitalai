import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { WhyDifferentSection } from "@/components/why-different-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import Aurora from "@/components/Aurora"
import { ServicesPillarsSection } from "@/components/services-pillars-section"
import { WhatsAppHighlightSection } from "@/components/whatsapp-highlight-section"
import { SectorsGridSection } from "@/components/sectors-grid-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div id="inicio">
            <HeroSection />
          </div>
          <WhyDifferentSection />
          <div id="soluciones">
            <ServicesPillarsSection />
          </div>
          <WhatsAppHighlightSection />
          <div id="sobre">
            <ProblemSolutionSection />
          </div>
          <div id="sectores">
            <SectorsGridSection />
          </div>
          <div id="testemunhos">
            <TestimonialsSection />
            <ROICalculatorSection />
          </div>
          <CTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
