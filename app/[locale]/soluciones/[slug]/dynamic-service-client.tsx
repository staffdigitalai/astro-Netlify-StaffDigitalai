"use client"

import { useTranslations } from "next-intl"
import type { WPService } from "@/lib/wordpress"
import { stripHtml } from "@/lib/wordpress"
import { getSolutionFallback } from "@/lib/solution-fallback-content"

import { SolutionHeroSection }        from "@/components/solution/hero-section"
import { SolutionFeaturesSection }    from "@/components/solution/features-section"
import { SolutionHowItWorksSection }  from "@/components/solution/how-it-works-section"
import { SolutionModulesSection }     from "@/components/solution/modules-section"
import { SolutionUseCasesSection }    from "@/components/solution/use-cases-section"
import { SolutionMetricsSection }     from "@/components/solution/metrics-section"

// Reused from the sector template (PR #68) — same shape, different data.
import { SectorIntegrationsSection }  from "@/components/sector/integrations-section"
import { SectorFaqSection }           from "@/components/sector/faq-section"
import { SectorFinalCtaSection }      from "@/components/sector/final-cta-section"

/**
 * Data-driven solution template.
 *
 * Render order (9 sections) mirrors the sector template from PR #68:
 *   1. Hero (left text, right mockup)
 *   2. Key features
 *   3. How it works (4 steps)
 *   4. Included modules
 *   5. Use cases by industry (cross-sell to /sectores)
 *   6. Key metrics (value + label + context)
 *   7. Integrations
 *   8. FAQ
 *   9. Final CTA
 *
 * Content source: ACF fields from WP take precedence once populated;
 * until then, the ES-master fallback from
 * lib/solution-fallback-content.ts drives every section. Both sources
 * are typed.
 */
export function DynamicServiceClient({
  service,
  locale,
}: {
  service: WPService
  locale: string
}) {
  const t = useTranslations("solution_ui")

  // The ES master slug drives fallback lookup even on /en or /pt, because
  // WPML translations carry the ES slug via wpml_translations.es.slug.
  // Fallback to the current post's slug when translations map is absent
  // (on /es/ the current slug IS the ES master).
  const esMasterSlug = service.wpml_translations?.es?.slug ?? service.slug
  const fallback = getSolutionFallback(esMasterSlug, locale)

  if (!fallback) {
    // Unknown slug — render a minimal safe shell so the page doesn't
    // crash. page.tsx already handles notFound() for truly missing
    // posts; we only reach here for posts that exist in WP but aren't
    // in our curated fallback map. Fail open with just the hero.
    return (
      <SolutionHeroSection
        category="agente"
        badge={t("cta_label")}
        title={stripHtml(service.title.rendered)}
        subtitle={stripHtml(service.excerpt.rendered).slice(0, 160)}
        locale={locale}
      />
    )
  }

  // Map SolutionFaqItem {q,a} → SectorFaqItem {pregunta,respuesta}
  // so we can reuse SectorFaqSection untouched.
  const faqForSector = fallback.faq.map((f) => ({
    pregunta: f.q,
    respuesta: f.a,
  }))

  // Friendly brand name for the final CTA form handoff.
  const serviceName = stripHtml(service.title.rendered)

  return (
    <>
      {/* 1 — Hero */}
      <SolutionHeroSection
        category={fallback.category}
        badge={fallback.hero.badge}
        title={fallback.hero.title}
        subtitle={fallback.hero.subtitle}
        mockupSlug={fallback.hero.mockupSlug}
        heroImage={fallback.hero.heroImage}
        locale={locale}
      />

      {/* 2 — Key features */}
      <SolutionFeaturesSection features={fallback.features} />

      {/* 3 — How it works */}
      <SolutionHowItWorksSection steps={fallback.howItWorks} />

      {/* 4 — Included modules */}
      <SolutionModulesSection modules={fallback.modules} />

      {/* 5 — Use cases by industry (cross-sell to /sectores) */}
      <SolutionUseCasesSection useCases={fallback.useCases} locale={locale} />

      {/* 6 — Key metrics */}
      <SolutionMetricsSection metrics={fallback.metrics} />

      {/* 7 — Integrations */}
      <SectorIntegrationsSection
        integrations={fallback.integrations}
        title={t("integrations_title")}
        subtitle={t("integrations_subtitle")}
      />

      {/* 8 — FAQ */}
      <SectorFaqSection
        faqs={faqForSector}
        title={t("faq_title")}
      />

      {/* 9 — Final CTA */}
      <SectorFinalCtaSection
        title={t("cta_title")}
        subtitle={t("cta_subtitle")}
        ctaLabel={t("cta_label")}
        sectorName={serviceName}
      />
    </>
  )
}
