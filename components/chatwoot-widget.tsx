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
          animation: staffdigital-breathe 3s ease-in-out infinite !important;
        }
        .woot-widget-bubble::before {
          content: '' !important;
          position: absolute !important;
          top: -4px !important;
          right: -4px !important;
          width: 14px !important;
          height: 14px !important;
          background: #EF4444 !important;
          border-radius: 50% !important;
          border: 2px solid white !important;
          animation: staffdigital-badge-pulse 1.5s ease-in-out infinite !important;
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
          border: 2px solid #10B981 !important;
          animation: staffdigital-ring-ping 3s ease-out infinite !important;
          pointer-events: none !important;
        }
        .woot-widget-bubble:hover {
          animation: none !important;
          transform: scale(1.1) !important;
          box-shadow: 0 0 25px rgba(27, 130, 242, 0.6) !important;
          transition: all 0.3s ease !important;
        }
        .woot-widget-bubble:hover::before {
          animation: none !important;
        }
        .woot-widget-bubble:hover::after {
          animation: none !important;
          opacity: 0 !important;
        }
        @keyframes staffdigital-breathe {
          0%   { box-shadow: 0 0 0 0 rgba(27, 130, 242, 0.6); background-color: #1B82F2; }
          33%  { box-shadow: 0 0 20px 8px rgba(16, 185, 129, 0.4); background-color: #0EA572; }
          66%  { box-shadow: 0 0 20px 8px rgba(27, 130, 242, 0.4); background-color: #1B82F2; }
          100% { box-shadow: 0 0 0 0 rgba(27, 130, 242, 0.6); background-color: #1B82F2; }
        }
        @keyframes staffdigital-badge-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes staffdigital-ring-ping {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.6; border-color: #10B981; }
          80%  { transform: translate(-50%, -50%) scale(1.8); opacity: 0; border-color: #10B981; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
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
