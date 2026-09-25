# MSK Institute — Third-Party Performance Budget

**Date:** September 25, 2026  
**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  

---

## Third-Party Performance Governance Policy

Every third-party script, widget, or CDN asset introduced to the website must comply with the following operational constraints to protect Core Web Vitals and user privacy.

| Service | Authorized Domain | Maximum Transfer Budget | Loading Strategy | Critical? | Can Defer? | Technical Owner | Permitted Functionality |
| :--- | :--- | :---: | :--- | :---: | :---: | :--- | :--- |
| **Google Tag Manager** | `googletagmanager.com` | ≤ 35 KB (gzip) | `afterInteractive` | No | Yes | Tech Lead | Tag routing, zero-PII conversion events |
| **Google Analytics 4** | `googletagmanager.com` | ≤ 50 KB (gzip) | `afterInteractive` | No | Yes | Analytics Arch | Session attribution, funnel tracking |
| **Google Maps** | `maps.google.com` | On-demand only (≤ 1.2 MB) | On user click / interaction | No | Yes | Frontend Eng | Campus directions preview on `/contact` |
| **Google Fonts** | Self-hosted (`_next/static/media`) | ≤ 40 KB (woff2) | Build-time self-hosted | Yes | No | Design / UI | Latin subset Plus Jakarta Sans |
| **Unsplash Images** | `images.unsplash.com` | ≤ 60 KB per course thumbnail | `next/image` WebP/AVIF | No | Yes | Content Team | Course catalog visual representation |
| **Social Media** | N/A (Plain `<a>` links) | 0 KB | Native anchor links | No | N/A | Marketing | Outbound profile links (No tracking pixels) |

---

## Governance Rules:
1. **Never load third-party scripts via `<head>` blocking tags:** All third parties must use `strategy="afterInteractive"` or `strategy="lazyOnload"`.
2. **Zero PII Leakage:** No student phone numbers, email addresses, or query strings containing personal information may be passed to third-party endpoints.
3. **No Third-Party Chat Widgets or Heatmaps:** Heavy client chat widgets (Intercom, Crisp, Drift) and DOM-recording heatmaps (Hotjar, FullStory) are prohibited on public pages.
4. **No Third-Party Font CDNs:** Fonts must be self-hosted via `next/font` to eliminate runtime DNS lookups and TLS handshakes.
