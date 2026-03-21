import { Suspense } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { Aurora } from "@/components/Aurora"
import { BlogContent } from "./blog-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | StaffDigital AI - Novedades y Articulos sobre IA",
  description: "Descubre las ultimas tendencias en automatizacion con IA, chatbots, y transformacion digital para empresas.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Aurora Effect */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#22c55e", "#16a34a", "#15803d"]}
          amplitude={1.5}
          blend={0.7}
          speed={0.3}
        />
      </div>

      {/* Navigation */}
      <GlassmorphismNav />

      {/* Blog Content */}
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent />
      </Suspense>

      {/* Footer */}
      <Footer />
    </main>
  )
}

function BlogSkeleton() {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 w-48 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/5 rounded-lg mx-auto animate-pulse" />
        </div>
        
        {/* Filters skeleton */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-10 w-24 bg-white/10 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-48 bg-white/10" />
              <div className="p-6 space-y-4">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="h-6 w-full bg-white/10 rounded" />
                <div className="h-4 w-3/4 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
