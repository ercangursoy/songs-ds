# Songs Table

A pixel-perfect implementation of the Songs table UI from Figma, built with React, TypeScript, and Vite.

## Live Demo

<!-- TODO: add Vercel/Netlify link after deploy -->
https://songs-ds.vercel.app/

## Prerequisites

- **Node.js** >= 18 (developed on v24.13.1)
- **Yarn** 4 (bundled via `.yarn/releases/`, no global install needed)

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:8000)
yarn dev

# Type check
yarn build

# Lint
yarn lint
```

## Architecture

### Design Token System

All visual values flow through a three-tier token system defined in `src/styles/tokens.css`:

| Tier | Example | Purpose |
|------|---------|---------|
| **Primitive** | `--color-gray-900: #212121` | Raw Figma values. Never consumed directly by components. |
| **Semantic** | `--color-text-primary: var(--color-gray-900)` | Intent-based aliases components actually use. |
| **Component** | `--input-height: 2.5rem` | Size tokens scoped to specific UI patterns. |

Tokens cover colors, spacing (4px base), radii, shadows, z-index scale, transition durations, border widths, typography, and opacity.

### Component Structure

```
src/
├── components/          # UI components (barrel-exported via index.ts)
│   ├── Button/          # Reusable primary/secondary button
│   ├── Checkbox/        # Controlled checkbox with animation
│   ├── DataTable/       # Sortable data table
│   ├── DesignNotes/     # UX enhancement documentation panel
│   ├── FilterButton/    # Shared trigger button for filter dropdowns
│   ├── MultiSelectFilter/  # Multi-select dropdown with search
│   ├── Pagination/      # Page navigation controls
│   ├── SearchInput/     # Search field with clear action
│   └── SingleSelectFilter/ # Single-select dropdown
├── hooks/               # Shared hooks (barrel-exported via index.ts)
│   ├── useClickOutside  # Click-outside detection
│   └── useDropdown      # Dropdown state, keyboard, click-outside
├── icons/               # SVG icon components (barrel-exported via index.ts)
├── data/                # Static song data + design notes
├── styles/              # Global styles + design tokens
└── types/               # Shared TypeScript types
```

All components export their prop interfaces. Imports use the `@/` path alias:

```tsx
import { SearchInput, type SearchInputProps } from '@/components';
import { useDropdown } from '@/hooks';
import { SearchIcon } from '@/icons';
import type { Song } from '@/types';
```

### Key Reusable Components

**SearchInput** — Configurable search field with icon, placeholder, and clear button.

**MultiSelectFilter** — Dropdown with search, checkbox selection, selected items panel, Apply/Clear All actions. Fully reusable with `label`, `options`, `value`, and `onChange` props.

**SingleSelectFilter** — Simple dropdown for single-value selection. Same prop pattern as MultiSelectFilter.

All three share `FilterButton` as their trigger and `useDropdown` for state management.

### Units

All sizing uses `rem` for accessibility (respects user font-size preferences). At the default 16px root, values match Figma's pixel spec 1:1. Shadows use `px` intentionally — visual effects shouldn't scale with font size.

### Opinionated UX Enhancements

The implementation includes subtle interaction enhancements not present in Figma's static design (transitions, hover states, keyboard support). These are documented in-app via the "UX Enhancements" floating button.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build
- **CSS Modules** — scoped component styles
- **ESLint** — TypeScript + React hooks rules
