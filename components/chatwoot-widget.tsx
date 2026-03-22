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
          animation: staffdigital-breathe 2.5s ease-in-out infinite !important;
        }
        .woot-widget-bubble::before {
          content: '' !important;
          position: absolute !important;
          bottom: 2px !important;
          right: 2px !important;
          top: auto !important;
          left: auto !important;
          width: 16px !important;
          height: 16px !important;
          background: #22C55E !important;
          border-radius: 50% !important;
          border: 2.5px solid white !important;
          animation: staffdigital-heartbeat 1.4s ease-in-out infinite !important;
          z-index: 10 !important;
        }
        .woot-widget-bubble::after {
          content: '' !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 50% !important;
          border: 3px solid rgba(255, 255, 255, 0.9) !important;
          animation: staffdigital-ring-ping 2.5s ease-out infinite !important;
          pointer-events: none !important;
        }
        .woot-widget-bubble:hover {
          animation: none !important;
          transform: scale(1.15) !important;
          box-shadow: 0 0 30px 10px rgba(139, 92, 246, 0.7), 0 0 60px 20px rgba(255, 255, 255, 0.25) !important;
          transition: all 0.3s ease !important;
        }
        .woot-widget-bubble:hover::before {
          animation: none !important;
          background: #22C55E !important;
          box-shadow: 0 0 6px 2px rgba(34, 197, 94, 0.6) !important;
        }
        .woot-widget-bubble:hover::after {
          animation: none !important;
          opacity: 0 !important;
        }
        @keyframes staffdigital-breathe {
          0%   { box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5), 0 0 25px 10px rgba(139, 92, 246, 0.3); }
          50%  { box-shadow: 0 0 25px 15px rgba(255, 255, 255, 0.75), 0 0 50px 25px rgba(139, 92, 246, 0.5); }
          100% { box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5), 0 0 25px 10px rgba(139, 92, 246, 0.3); }
        }
        @keyframes staffdigital-heartbeat {
          0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
          15%  { transform: scale(1.25); box-shadow: 0 0 8px 3px rgba(34, 197, 94, 0.5); }
          30%  { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.3); }
          45%  { transform: scale(1.2); box-shadow: 0 0 6px 2px rgba(34, 197, 94, 0.4); }
          60%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes staffdigital-ring-ping {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.9; border-color: rgba(255, 255, 255, 0.9); }
          70%  { transform: translate(-50%, -50%) scale(2.2); opacity: 0; border-color: rgba(139, 92, 246, 0.3); }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
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
