import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Aurora } from "@/components/Aurora"
import { Button } from "@/components/ui/button"
import { getPost, getPosts, stripHtml, formatDate, getFeaturedImageUrl } from "@/lib/wordpress"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Post no encontrado | StaffDigital AI",
    }
  }

  return {
    title: `${stripHtml(post.title.rendered)} | StaffDigital AI Blog`,
    description: stripHtml(post.excerpt.rendered),
    openGraph: {
      title: stripHtml(post.title.rendered),
      description: stripHtml(post.excerpt.rendered),
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const imageUrl = getFeaturedImageUrl(post)
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name
  const readingTime = Math.ceil(stripHtml(post.content.rendered).split(/\s+/).length / 200)

  // Get related posts
  const relatedPostsData = await getPosts({
    perPage: 3,
    category: post.categories[0],
  })
  const relatedPosts = relatedPostsData.data.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Aurora Effect */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#22c55e", "#16a34a", "#15803d"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.2}
        />
      </div>

      {/* Navigation */}
      <GlassmorphismNav />

      {/* Article */}
      <article className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            {/* Category Badge */}
            {categoryName && (
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20 mb-4">
                {categoryName}
              </span>
            )}

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-balance"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min de lectura</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10">
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
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-white/70 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-white/70 prose-ol:text-white/70
              prose-li:marker:text-primary
              prose-blockquote:border-l-primary prose-blockquote:text-white/60 prose-blockquote:italic
              prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
              prose-img:rounded-xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-white/60">Comparte este articulo:</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                  asChild
                >
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(stripHtml(post.title.rendered))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compartir en Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                  asChild
                >
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compartir en LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                  asChild
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compartir en Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 border-t border-white/10 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Articulos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const relatedImageUrl = getFeaturedImageUrl(relatedPost)
                return (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="relative h-40 overflow-hidden bg-white/5">
                      {relatedImageUrl ? (
                        <Image
                          src={relatedImageUrl}
                          alt={stripHtml(relatedPost.title.rendered)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-orange-500/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-white/40 text-sm mb-2">{formatDate(relatedPost.date)}</p>
                      <h3
                        className="text-white font-medium line-clamp-2 group-hover:text-primary transition-colors"
                        dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </main>
  )
}
