import type { Metadata } from "next"
import { Suspense } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { BlogContent } from "./blog-content"
import { getCategories, getContentTypes, getPosts } from "@/lib/wordpress"
import type { WPPost } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos y guias sobre agentes IA con voz humana. WhatsApp, telefono, chat web y mas.",
}

// Revalidate every 5 minutes for ISR
export const revalidate = 300

export default async function BlogPage() {
  let categories: Awaited<ReturnType<typeof getCategories>> = []
  let contentTypes: Awaited<ReturnType<typeof getContentTypes>> = []
  let initialPosts: WPPost[] = []
  let initialTotalPages = 1

  try {
    const [cats, types, postsResult] = await Promise.all([
      getCategories("es"),
      getContentTypes("es"),
      getPosts({ page: 1, perPage: 9 }),
    ])
    categories = cats
    contentTypes = types
    initialPosts = postsResult.posts
    initialTotalPages = postsResult.totalPages
  } catch (error) {
    console.error("Error fetching blog data:", error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <GlassmorphismNav />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-foreground text-sm font-medium mb-6 animate-fade-in-badge">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Blog
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance mb-6 animate-fade-in-heading">
              Noticias y{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                Recursos
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-subheading">
              Mantente al dia con las ultimas tendencias en automatización e inteligencia artificial para empresas.
            </p>
          </div>

          {/* Blog Content with Filters */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card animate-pulse h-[400px]" />
                ))}
              </div>
            }
          >
            <BlogContent
              initialCategories={categories}
              initialContentTypes={contentTypes}
              initialPosts={initialPosts}
              initialTotalPages={initialTotalPages}
            />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}
