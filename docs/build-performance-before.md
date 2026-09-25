# MSK Institute — Build Performance Baseline (Before)

**Framework:** Next.js 15.5.24  
**Date:** September 25, 2026  
**Node.js Version:** v22.17.0  
**Compilation Time:** 33.3 seconds  
**Total Prerendered Pages:** 1,688 SSG pages  

---

## 1. Global Shared Chunks

These bundles are transferred on initial page load for every route:

| Chunk File | Raw Size (KB) | Gzip Size (KB) | Description |
| :--- | :---: | :---: | :--- |
| `static/chunks/1255-7b4b5a04291b6a94.js` | 170.1 KB | 45.1 KB | Next.js App Router core client runtime |
| `static/chunks/4bd1b696-100b9d70ed4e49c1.js` | 169.0 KB | 53.1 KB | React 19 + ReactDOM core runtime |
| `static/chunks/app/layout-71a4ebcc07a3bac5.js` | 67.3 KB | 17.5 KB | Root layout client components (Navbar, PWA, GTM) |
| `static/chunks/8633-61ebe6c95d182a41.js` | 27.8 KB | 9.4 KB | Lucide React shared icons |
| `static/chunks/2059-e49440e3a174908f.js` | 26.2 KB | 5.8 KB | PWA Context provider & registration |
| `static/chunks/7861-717f7d51ecd3e3e2.js` | 14.6 KB | 5.3 KB | Analytics Tracker & dataLayer delegation |
| `static/chunks/35-1b453d0faeeda561.js` | 9.3 KB | 3.0 KB | Web share & utility handlers |
| `static/chunks/2619-04bc32f026a0d946.js` | 8.4 KB | 3.3 KB | Toast notifications (`react-hot-toast`) |
| `static/chunks/webpack-2ff9c138d92b9432.js` | 3.9 KB | 2.0 KB | Webpack runtime & module manifest |
| `static/css/230ce12063e55762.css` | 210.6 KB | 28.6 KB | Tailwind CSS v4 compiled stylesheet |
| `static/css/de25b33876e2d6cf.css` | 1.6 KB | 0.6 KB | Variable font style definitions |
| **Total First Load Shared JS** | **497.2 KB** | **103.0 KB** | Minimum JS baseline for all pages |

---

## 2. Route-Specific JavaScript Bundle Breakdown (Before Optimization)

| Route Path | Route Type | Raw JS (KB) | Gzip JS (KB) | First Load JS (Gzip) |
| :--- | :--- | :---: | :---: | :---: |
| `/verify-certificate` | Static | 1,485.6 KB | 365.8 KB | **307 kB** ⚠️ |
| `/admin` | Static | 1,484.7 KB | 361.9 KB | **303 kB** ⚠️ |
| `/tools/typing` | Static | 1,361.6 KB | 367.2 KB | **303 kB** ⚠️ |
| `/playground` | Static | 1,248.5 KB | 324.7 KB | **262 kB** ⚠️ |
| `/tutorials/[slug]/[topicSlug]` | SSG | 884.8 KB | 225.7 KB | 167 kB |
| `/blogs/[slug]` | SSG | 858.1 KB | 218.3 KB | 157 kB |
| `/careers` | Static | 768.0 KB | 187.6 KB | 125 kB |
| `/live` | Static | 765.5 KB | 186.1 KB | 127 kB |
| `/study-material` | Static | 763.7 KB | 186.2 KB | 127 kB |
| `/courses` | Static | 750.3 KB | 184.0 KB | 125 kB |
| `/live-batches/[id]` | SSG | 741.7 KB | 183.2 KB | 130 kB |
| `/contact` | Static | 741.1 KB | 182.6 KB | 123 kB |
| `/courses/[slug]` | SSG | 734.9 KB | 181.0 KB | 128 kB |
| `/live-batches` | Static | 732.2 KB | 181.7 KB | 122 kB |
| `/tutorials/[slug]` | SSG | 726.3 KB | 180.0 KB | 112 kB |
| `/` (Homepage) | Static | 720.6 KB | 178.0 KB | 110 kB |
| `/blogs` | Static | 719.1 KB | 177.2 KB | 109 kB |

---

## 3. High-Priority JS Bloat Targets Identified

1. **`8515-88237a44d1a65930.js` (745.3 KB raw):**
   * Loaded by: `/verify-certificate`, `/admin`
   * Reason: Top-level static imports in `src/services/api.ts` of `all-courses.json` (679 KB), `tutorials.json` (212 KB), `study-materials.json` (136 KB).
   * Target: Eliminate from browser bundles by deferring server-only JSON access.
2. **`164f4fb6-cafca3d180b7eab5.js` (322.3 KB raw):**
   * Loaded by: `/tools/typing`
   * Reason: Static import of `import { jsPDF } from 'jspdf'` in `TypingCertificateModal.tsx`.
   * Target: Dynamically import `jsPDF` only upon user clicking "Download PDF Certificate".
3. **`PlaygroundApp` Client Shell:**
   * Loaded by: `/playground`
   * Reason: Static import of the Monaco editor harness on `/playground/page.tsx`.
   * Target: Dynamic import with lightweight loading skeleton.
