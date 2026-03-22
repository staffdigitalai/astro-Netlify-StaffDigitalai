"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    chatwootSDK: {
      run: (config: { websiteToken: string; baseUrl: string }) => void
    }
    $chatwoot: {
      toggle: (state?: "open" | "close") => void
      setUser: (identifier: string, user: Record<string, string>) => void
      setCustomAttributes: (attributes: Record<string, string>) => void
      deleteCustomAttribute: (key: string) => void
      setLocale: (locale: string) => void
      reset: () => void
    }
  }
}

export function ChatwootWidget() {
  useEffect(() => {
    console.log("[v0] ChatwootWidget useEffect running")
    
    // Check if script is already loaded
    if (document.getElementById("chatwoot-sdk")) {
      console.log("[v0] Chatwoot script already exists")
      return
    }

    const BASE_URL = "https://chat.staffdigital.eu"
    console.log("[v0] Loading Chatwoot from:", BASE_URL)

    // Inject pulse animation styles
    if (!document.getElementById("chatwoot-styles")) {
      const style = document.createElement("style")
      style.id = "chatwoot-styles"
      style.textContent = `
        .woot-widget-bubble {
          animation: staffdigital-pulse 2s ease-in-out infinite;
        }
        @keyframes staffdigital-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(27, 130, 242, 0.5); }
          50%  { box-shadow: 0 0 16px 8px rgba(27, 130, 242, 0.15); }
          100% { box-shadow: 0 0 0 0 rgba(27, 130, 242, 0); }
        }
        /* Stop pulse when chat is open */
        .woot-widget-bubble.woot--close {
          animation: none;
        }
      `
      document.head.appendChild(style)
    }

    const script = document.createElement("script")
    script.id = "chatwoot-sdk"
    script.src = `${BASE_URL}/packs/js/sdk.js`
    script.async = true
    script.defer = true

    script.onload = () => {
      console.log("[v0] Chatwoot script loaded successfully")
      if (window.chatwootSDK) {
        console.log("[v0] Running chatwootSDK.run()")
        window.chatwootSDK.run({
          websiteToken: "wWcdMuPDEZea3tJYNcWkKa2c",
          baseUrl: BASE_URL,
        })
      } else {
        console.log("[v0] chatwootSDK not available on window")
      }
    }

    script.onerror = (error) => {
      console.error("[v0] Failed to load Chatwoot script:", error)
    }

    document.body.appendChild(script)
    console.log("[v0] Chatwoot script appended to body")

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById("chatwoot-sdk")
      if (existingScript) {
        existingScript.remove()
      }
      const existingStyles = document.getElementById("chatwoot-styles")
      if (existingStyles) {
        existingStyles.remove()
      }
    }
  }, [])

  return null
}

// Helper functions to interact with Chatwoot
export const chatwootHelpers = {
  // Open or close the chat widget
  toggle: (state?: "open" | "close") => {
    if (typeof window !== "undefined" && window.$chatwoot) {
      window.$chatwoot.toggle(state)
    }
  },

  // Set user information
  setUser: (identifier: string, user: { name?: string; email?: string; phone?: string }) => {
    if (typeof window !== "undefined" && window.$chatwoot) {
      window.$chatwoot.setUser(identifier, user as Record<string, string>)
    }
  },

  // Set custom attributes
  setCustomAttributes: (attributes: Record<string, string>) => {
    if (typeof window !== "undefined" && window.$chatwoot) {
      window.$chatwoot.setCustomAttributes(attributes)
    }
  },

  // Set locale
  setLocale: (locale: string) => {
    if (typeof window !== "undefined" && window.$chatwoot) {
      window.$chatwoot.setLocale(locale)
    }
  },

  // Reset session
  reset: () => {
    if (typeof window !== "undefined" && window.$chatwoot) {
      window.$chatwoot.reset()
    }
  },
}
