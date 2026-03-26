"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WPPost } from "@/lib/wordpress"

interface SeoQuestionContentProps {
  post: WPPost
  title: string
  imageUrl: string | null
  formattedDate: string
}

export function SeoQuestionContent({ 
  post, 
  title, 
  imageUrl, 
  formattedDate 
}: SeoQuestionContentProps) {
  const readingTime = post.acf?.reading_time || Math.ceil(post.content.rendered.split(" ").length / 200)

  return (
    <article className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link 
            href="/faq" 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a FAQs
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readingTime} min de lectura
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-ul:text-muted-foreground prose-ol:text-muted-foreground
          prose-li:marker:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Related Questions CTA */}
      <div className="p-8 rounded-2xl border border-border bg-card/50 space-y-4">
        <h3 className="text-xl font-bold">Tienesmás preguntas?</h3>
        <p className="text-muted-foreground">
          Explora nuestras FAQs o contacta con nuestro equipo para resolver cualquier duda.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/faq">
              Ver todas las FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Solicitar demo</Link>
          </Button>
        </div>
      </div>

      {/* Main CTA */}
      <div className="text-center space-y-6 p-8 lg:p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold">
          Listo para automatizar tu negocio?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Descubre como StaffDigital AI puede ayudarte a mejorar la atención al cliente
          y reducir costes operativos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/demo">
              Solicitar demo gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/precios">Ver precios</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
