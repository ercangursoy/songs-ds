# Songs Table

A pixel-perfect implementation of the Songs table UI from Figma, built with React, TypeScript, and Vite.

## Live Demo

https://songs-ds.vercel.app/

## Prerequisites

- **Node.js** >= 18
- **Yarn** 4 (bundled via `.yarn/releases/`, no global install needed)

## Getting Started

```bash
yarn install            # install dependencies
yarn dev                # dev server → http://localhost:8000
yarn build              # type-check + production build
yarn lint               # eslint
yarn test               # run unit tests (Vitest)
yarn test:watch         # run tests in watch mode
yarn fmt                # format code (Prettier)
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - dev server and build
- **CSS Modules** - scoped component styles
- **Vitest** + **React Testing Library** - unit tests
- **ESLint** + **Prettier** - linting and formatting

## Architecture

### Design Token System

All visual values flow through a three-tier token system defined in `src/styles/tokens.css`:

| Tier          | Example                                       | Purpose                                                  |
| ------------- | --------------------------------------------- | -------------------------------------------------------- |
| **Primitive** | `--color-gray-900: #212121`                   | Raw Figma values. Never consumed directly by components. |
| **Semantic**  | `--color-text-primary: var(--color-gray-900)` | Intent-based aliases components actually use.            |
| **Component** | `--input-height: 2.5rem`                      | Size tokens scoped to specific UI patterns.              |

Tokens cover colors, spacing (4 px base), radii, shadows, z-index scale, transition durations, border widths, typography, and opacity.

### Component Structure

```
src/
├── components/             # UI components (barrel-exported via index.ts)
│   ├── Button/             # Primary / secondary button
│   ├── Checkbox/           # Controlled checkbox with animation
│   ├── DataTable/          # Generic, sortable data table
│   ├── DesignNotes/        # UX enhancement documentation panel
│   ├── FilterButton/       # Shared trigger for filter dropdowns
│   ├── MultiSelectFilter/  # Multi-select dropdown with search
│   ├── Pagination/         # Page navigation controls
│   ├── SearchInput/        # Search field with clear action
│   └── SingleSelectFilter/ # Single-select dropdown
├── hooks/                  # Shared hooks (barrel-exported via index.ts)
│   ├── useClickOutside     # Click-outside detection
│   ├── useDropdown         # Dropdown state, keyboard, click-outside
│   └── useFocusTrap        # Focus trapping for dialogs and drawers
├── icons/                  # SVG icon components (barrel-exported)
├── data/                   # Static song data + design notes
├── styles/                 # Global styles + design tokens
└── types/                  # Shared TypeScript types
```

Imports use the `@/` path alias. All components export their prop interfaces.

### Key Reusable Components

**SearchInput** - Configurable search field with icon, placeholder, and clear button.

**MultiSelectFilter** - Dropdown with search, checkbox selection, selected items panel, Apply/Clear All actions. Fully reusable via `label`, `options`, `value`, and `onChange` props.

**SingleSelectFilter** - Simple dropdown for single-value selection. Same prop pattern as MultiSelectFilter.

Both filters share `FilterButton` as their trigger and `useDropdown` for state management.

### Accessibility

- Semantic HTML and ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-sort`, `aria-activedescendant`)
- Full keyboard navigation in dropdown filters (Arrow keys, Home/End, Enter/Space)
- Focus trapping in the DesignNotes drawer with focus restoration on close
- `prefers-reduced-motion` media query disables animations globally
- Responsive layout adapts to narrow viewports

### UX Enhancements Beyond Figma

The "UX Enhancements" button in the toolbar opens a drawer listing all interaction improvements added beyond Figma's static design (hover states, keyboard navigation, transitions). The drawer also includes a toggle to switch between dynamic (Figma spec) and fixed table height (prevents layout shift on paginate).

### Design Decisions

- **rem over px** - All sizing uses rem so the UI scales with the user's browser font-size preference. At the default 16px root, values match Figma 1:1. Shadows are the exception - visual effects shouldn't grow with text.
- **Three-tier tokens** - Primitives are raw Figma values, semantics add meaning (`--color-text-primary`), component tokens scope sizing (`--input-height`). This separation means a theme change only touches primitives.
- **CSS Modules over CSS-in-JS** - Zero runtime cost, native CSS features (keyframes, media queries, pseudo-elements), and scoped class names without a library dependency.
- **Data attributes for state** - `data-active`, `data-open`, `data-checked` instead of class name toggles. Keeps styling declarative and queryable in tests.
- **Shared FilterButton + useDropdown** - Both filter types compose the same trigger and hook, ensuring consistent interaction patterns (animation, keyboard nav, click-outside, focus restore) without duplication.

## Testing

Unit tests cover all interactive components using **Vitest** and **React Testing Library**:

| Component          | Tests                                                           |
| ------------------ | --------------------------------------------------------------- |
| SearchInput        | rendering, typing, clear button                                 |
| Checkbox           | checked states, `aria-checked`                                  |
| Pagination         | page info, disabled states, navigation                          |
| FilterButton       | label, active states, clear without toggle                      |
| DataTable          | rows, columns, sort, `aria-sort`                                |
| SingleSelectFilter | open, select, deselect, clear                                   |
| MultiSelectFilter  | search, checkbox toggle, apply/clear, event bubbling regression |

```bash
yarn test   # 50 tests across 7 suites
```
