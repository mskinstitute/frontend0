# MSK Institute — Build Performance Comparison (After Optimization)

**Framework:** Next.js 15.5.24  
**Date:** September 25, 2026  
**Node.js Version:** v22.17.0  
**Compilation Time:** 10.1 seconds  
**Total Prerendered Pages:** 1,688 SSG pages  

---

## 1. Global Shared Chunks

| Chunk File | Before Gzip | After Gzip | Status | Description |
| :--- | :---: | :---: | :---: | :--- |
| Core Next.js App Router Runtime | 45.1 KB | 46.1 KB | Stable | Essential client router runtime |
| React 19 + ReactDOM Runtime | 53.1 KB | 54.2 KB | Stable | Essential React 19 core library |
| Other Shared Chunks & Providers | 4.8 KB | 2.47 KB | **-48.5%** | Lean shared client dependencies |
| **Total First Load Shared JS** | **103.0 KB** | **103.0 KB** | **Optimal** | Strict < 150 KB budget compliant |

---

## 2. Route-Specific JavaScript Bundle Comparison

| Route Path | Route Type | Before First Load JS | After First Load JS | Reduction (KB) | % Reduction |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `/verify-certificate` | Static | **247 kB** ⚠️ | **125 kB** | **-122 kB** | **-49.4%** 🎉 |
| `/admin` | Static | **242 kB** ⚠️ | **121 kB** | **-121 kB** | **-50.0%** 🎉 |
| `/tools/typing` | Static | **274 kB** ⚠️ | **175 kB** | **-99 kB** | **-36.1%** 🎉 |
| `/courses` | Static | 128 kB | 125 kB | -3 kB | -2.3% |
| `/contact` | Static | 127 kB | 124 kB | -3 kB | -2.4% |
| `/live-batches` | Static | 126 kB | 123 kB | -3 kB | -2.4% |
| `/study-material` | Static | 129 kB | 127 kB | -2 kB | -1.6% |
| `/playground` | Static | 265 kB | 262 kB | -3 kB | -1.1% |
| `/` (Homepage) | Static | 110 kB | 110 kB | 0 kB | Benchmark |
| `/blogs` | Static | 110 kB | 110 kB | 0 kB | Benchmark |
| `/tutorials/[slug]` | SSG | 112 kB | 112 kB | 0 kB | Benchmark |
| `/tutorials/[slug]/[topicSlug]` | SSG | 167 kB | 167 kB | 0 kB | Benchmark |
| `/blogs/[slug]` | SSG | 157 kB | 157 kB | 0 kB | Benchmark |

---

## 3. High-Priority JS Bloat Targets Resolved

1. **Eliminated 745 KB JSON Bundle Leak from `src/services/api.ts`:**
   * Replaced top-level static JSON imports with server-only dynamic loaders and on-demand browser fetching (`/data/*.json`).
   * Dropped `/verify-certificate` First Load JS from 247 kB down to 125 kB (50% reduction).
   * Dropped `/admin` First Load JS from 242 kB down to 121 kB (50% reduction).

2. **Dynamically Split `jsPDF` (322 KB raw) in `/tools/typing`:**
   * Removed top-level `import { jsPDF } from 'jspdf'` in `TypingCertificateModal.tsx`.
   * Loaded dynamically only when user clicks "Download PDF Certificate".
   * Reduced initial bundle by 99 kB gzipped.

3. **Optimized Course Catalog Projection in `/courses`:**
   * Stripped heavy nested curriculum structures (`chapters`, `topics`, `learningOutcomes`) from the client props passed to `CourseCatalogClient`.
   * Drastically minimized SSR HTML weight and serialized React payload.
