"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { SolutionMockup } from "@/components/solution-mockups"
import { useMotionReveal } from "@/hooks/use-motion-reveal"
import type { SolutionCategory } from "@/lib/solution-fallback-content"

interface SolutionHeroSectionProps {
  category: SolutionCategory
  badge: string
  title: string
  subtitle: string
  mockupSlug?: string
  /**
   * Optional hero image (relative to /public). When set, the right
   * column renders an <Image> instead of the animated SolutionMockup.
   * Alt text falls back to the localized `title`.
   */
  heroImage?: string
  locale: string
}

/**
 * Solution page hero — left: badge (category) + title + subtitle +
 * 2 CTAs. Right: solution-specific mockup. Differs from the sector
 * hero (center-stacked) in layout, so kept as its own component.
 */
export function SolutionHeroSection({
  category,
  badge,
  title,
  subtitle,
  mockupSlug,
  heroImage,
  locale,
}: SolutionHeroSectionProps) {
  const t = useTranslations("solution_ui")
  const reveal = useMotionReveal({ y: 24 })
  const prefix = locale === "es" ? "" : `/${locale}`

  const categoryLabel = t(`category_${category}`)

  return (
    <section
      aria-labelledby="solution-hero-title"
      className="pt-28 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        <motion.div {...reveal}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest text-brand-primary bg-brand-primary/10 border border-brand-primary/20 mb-6">
            {categoryLabel} · {badge}
          </span>

          <h1
            id="solution-hero-title"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-fg-primary leading-[1.1] tracking-tight text-balance mb-6"
          >
            {title}
          </h1>

          <p className="text-base sm:text-lg text-fg-muted leading-relaxed max-w-xl mb-8">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href={`${prefix}/demo`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-gradient-from to-gradient-to hover:scale-[1.02] transition-transform"
            >
              {t("cta_label")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`${prefix}/soluciones`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold bg-fg-primary text-bg-page hover:opacity-90 transition-opacity"
            >
              {t("cta_secondary")}
            </Link>
          </div>
        </motion.div>

        {/* Right column: heroImage > mockup > placeholder gradient. */}
        <motion.div
          {...reveal}
          className="relative rounded-2xl border border-default bg-bg-card dark:bg-bg-elevated overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,120,170,0.25)]"
        >
          {heroImage ? (
            <Image
              src={heroImage}
              alt={title}
              width={1408}
              height={768}
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full h-auto block"
            />
          ) : mockupSlug ? (
            <SolutionMockup slug={mockupSlug} />
          ) : (
            <div className="aspect-video bg-gradient-to-br from-brand-secondary/15 to-brand-primary/15" aria-hidden="true" />
          )}
        </motion.div>
      </div>
    </section>
  )
}
