# MSK Institute — City Exclusivity & Franchise Protection (Phase 5)

## 1. Core Business Rule

> **Only ONE active MSK Institute franchise or physical branch may exist in ONE city.**

This invariant is strictly enforced across the MSK Institute digital platform at three separate levels:
1. **Model & Invariant Checking (`src/lib/branches/validation.ts`)**
2. **Build-Time Continuous Integration (`scripts/validate-branches.js`)**
3. **Franchise Inquiry Engine (`checkCityAvailability()`)**

---

## 2. Business Rationale

1. **Territorial Viability:** Every MSK Institute franchise partner is guaranteed exclusive rights over student recruitment within their city municipality, ensuring strong unit economics and predictable return on capital.
2. **Sibling Cannibalization Protection:** Two branches in the same city would split local Google Search rankings, divide local brand equity, and confuse prospective students.
3. **Quality & Standard Assurance:** Limiting each city to one accredited partner allows centralized curriculum monitoring, verifiable certification governance, and direct faculty development under Er. Sumit Kumar's leadership.

---

## 3. City Normalization Algorithm

Cities in India often have varying suffixes depending on postal, municipal, or colloquial usage:
- *"Agra Cantt"*, *"Agra Junction"*, *"Agra City"*, and *"Agra"* all refer to the same city market.
- *"Shikohabad Station Road"*, *"Shikohabad Jn"*, and *"Shikohabad"* must resolve to the identical territory.

The normalization engine in [`src/lib/branches/normalization.ts`](file:///d:/Sumit/MSK-Institute-Website/src/lib/branches/normalization.ts) processes input strings as follows:

```typescript
export function normalizeCity(city: string): string {
  if (!city || typeof city !== 'string') return '';
  return city
    .trim()
    .toLowerCase()
    .replace(
      /\s+(city|cantt|cantonment|junction|jn|railway\s*station|central|town|hub)$/i,
      ''
    )
    .replace(/[^a-z0-9]/g, '');
}

export function createGeographicKey(city: string, state = 'Uttar Pradesh', country = 'India'): string {
  const normCity = normalizeCity(city);
  const normState = state.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const normCountry = country.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${normCountry}:${normState}:${normCity}`;
}
```

### Examples of Normalization:
- `"Agra City"` ➔ `"agra"`
- `"Agra Cantt"` ➔ `"agra"`
- `"Agra Junction"` ➔ `"agra"`
- `"Shikohabad Jn."` ➔ `"shikohabad"`
- `"  Firozabad  "` ➔ `"firozabad"`

---

## 4. Enforcement Mechanisms

### 4.1 Invariant Assertion: `assertSingleActiveBranchPerCity(branches)`
Whenever branches are requested from the repository (`getAllBranches()`), the registry checks every active branch (`status === 'OPEN'` or `'COMING_SOON'`). If two branches resolve to the same normalized city key, a `BranchExclusivityError` is thrown immediately.

```typescript
export class BranchExclusivityError extends Error {
  constructor(public city: string, public conflictingBranchIds: string[], message?: string) {
    super(
      message ||
        `Branch Exclusivity Violation: More than one active branch detected in city '${city}'. Conflicting branches: ${conflictingBranchIds.join(', ')}`
    );
    this.name = 'BranchExclusivityError';
  }
}
```

### 4.2 Automated CI Validation: `npm run validate:branches`
Runs in local development, pre-commit hooks, and production deployments. It verifies that `activeCityRegistry` has no hash collisions across all branch records.

---

## 5. Inquiry & Availability Flow

Prospective franchise partners can verify territory status using `checkCityAvailability(city)`:

| City Status | Meaning | Action |
|---|---|---|
| `AVAILABLE` | No branch exists in the normalized city. | Franchise inquiry accepted. Territory can be reserved. |
| `COMING_SOON` | Territory has been claimed by a planned regional center. | Partner inquiry waitlisted for sub-franchise or co-operation. |
| `ALREADY_OCCUPIED` | An accredited MSK Institute campus is operating. | System rejects new franchise applications for that city. |
