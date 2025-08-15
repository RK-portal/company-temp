# Code Style and Conventions

## TypeScript Configuration

- **Strict Mode**: Enabled (`"strict": true`)
- **Module Resolution**: Bundler mode
- **JSX**: Preserve mode
- **Path Aliases**:
  - `@/*` - Root directory
  - `@/components/*` - Components directory
  - `@/lib/*` - Library/utilities directory
  - `@/styles/*` - Styles directory

## Code Formatting (Prettier)

- **Semicolons**: No semicolons (`"semi": false`)
- **Quotes**: Single quotes (`"singleQuote": true`)
- **Tab Width**: 2 spaces
- **Trailing Comma**: ES5 style
- **Print Width**: 100 characters
- **Arrow Functions**: Always use parentheses

## ESLint Rules

- **Next.js Core Web Vitals**: Extended configuration
- **Import Ordering**: Enforced with specific groups:
  1. builtin
  2. external
  3. internal
  4. parent
  5. sibling
  6. index
  7. object
  8. type
- **Newlines Between Import Groups**: Required
- **Alphabetical Imports**: Case-insensitive ordering

## React/Next.js Conventions

- **Functional Components**: Use arrow functions with TypeScript
- **Type Annotations**: Explicit types for props and function parameters
- **File Extensions**: `.tsx` for React components, `.ts` for utilities
- **Component Structure**: Components organized in subdirectories (ui/, sections/, layout/)

## CSS/Styling

- **Tailwind CSS**: Primary styling method
- **CSS Modules**: Not used in this project
- **Global Styles**: In `app/globals.css`
- **Design Tokens**: Stored in `tokens/brand.json`

## File Naming

- **Components**: PascalCase (e.g., `RootLayout.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Config Files**: camelCase (e.g., `site.ts`, `navigation.ts`)

## Import Style Example

```typescript
import { Inter } from 'next/font/google'

import type { Metadata } from 'next'

import './globals.css'
```

## Comments

- Avoid unnecessary comments
- Use JSDoc for complex functions if needed
- Keep code self-documenting
