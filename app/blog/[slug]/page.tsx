import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPost, getPosts, getFeaturedImageUrl, stripHtml, formatDate } from "@/lib/wordpress"
import type { WPPost } from "@/lib/wordpress"

// ISR: revalidate every 5 minutes so new posts appear without redeploy
export const revalidate = 300

// Pre-generate known post slugs at build time
export async function generateStaticParams() {
  try {
    const { posts } = await getPosts({ perPage: 100 })
    return posts.map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getPostData(slug: string): Promise<WPPost | null> {
  try {
    return await getPost(slug)
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return {
      title: "Post no encontrado - StaffDigital AI",
    }
  }

  const description = post.acf?.meta_description || stripHtml(post.excerpt.rendered).slice(0, 160)
  const imageUrl = getFeaturedImageUrl(post, "full")

  return {
    title: post.acf?.meta_title || `${stripHtml(post.title.rendered)} - StaffDigital AI`,
    description,
    openGraph: {
      title: stripHtml(post.title.rendered),
      description,
      images: imageUrl ? [imageUrl] : undefined,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostData(slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <GlassmorphismNav />
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post no encontrado</h1>
            <p className="text-muted-foreground mb-8">El articulo que buscas no existe o ha sido eliminado.</p>
            <Button asChild>
              <Link href="/blog">Volver al blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const imageUrl = getFeaturedImageUrl(post, "full")
  const categoryNames = post._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || []

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <GlassmorphismNav />

      <article className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver al blog
          </Link>

          {/* Header */}
          <header className="space-y-6 mb-12">
            {/* Categories */}
            {categoryNames.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categoryNames.map((name) => (
                  <Badge key={name} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Tag className="h-3 w-3 mr-1" />
                    {name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta */}
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              {post.acf?.reading_time && (
                <span>{post.acf.reading_time} min de lectura</span>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-[480px] rounded-2xl overflow-hidden mb-12">
              <Image
                src={imageUrl}
                alt={stripHtml(post.title.rendered)}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-primary
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-card prose-pre:border prose-pre:border-border
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Footer CTA */}
          <div className="mt-16 p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quieres sabermás sobre IA para tu negocio?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Descubre como StaffDigital AI puede transformar tu empresa con soluciones de automatización inteligente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/demo">
                  Solicitar Demo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/blog">
                  Vermás artículos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
