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

const BASE_URL = "https://chat.staffdigital.eu"

export function ChatwootWidget() {
  useEffect(() => {
    // Already loaded — nothing to do (persists across navigations)
    if (document.getElementById("chatwoot-sdk")) return

    // Inject pulse animation styles once
    if (!document.getElementById("chatwoot-styles")) {
      const style = document.createElement("style")
      style.id = "chatwoot-styles"
      style.textContent = `
        .woot-widget-bubble {
          animation: staffdigital-pulse 2s ease-in-out infinite;
        }
        .woot-widget-bubble:hover {
          animation: none;
        }
        @keyframes staffdigital-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(27, 130, 242, 0.5); }
          50%  { box-shadow: 0 0 16px 8px rgba(27, 130, 242, 0.15); }
          100% { box-shadow: 0 0 0 0 rgba(27, 130, 242, 0); }
        }
      `
      document.head.appendChild(style)
    }

    // Load SDK script (async only, no defer — redundant in dynamic injection)
    const script = document.createElement("script")
    script.id = "chatwoot-sdk"
    script.src = `${BASE_URL}/packs/js/sdk.js`
    script.async = true

    script.onload = () => {
      window.chatwootSDK?.run({
        websiteToken: "wWcdMuPDEZea3tJYNcWkKa2c",
        baseUrl: BASE_URL,
      })
    }

    document.head.appendChild(script)

    // No cleanup — Chatwoot must persist across client-side navigations
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
