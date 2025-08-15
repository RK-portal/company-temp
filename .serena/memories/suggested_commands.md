# Suggested Commands for Company Demo Site

## Development Commands

### Start Development Server

```bash
pnpm dev
```

Starts the Next.js development server on http://localhost:3000

### Build for Production

```bash
pnpm build
```

Creates an optimized production build in the `out/` directory

### Start Production Server

```bash
pnpm start
```

Starts the production server (after building)

## Code Quality Commands

### Type Checking

```bash
pnpm typecheck
```

Runs TypeScript compiler to check for type errors without emitting files

### Linting

```bash
pnpm lint
```

Runs ESLint to check for code quality issues

### Code Formatting

```bash
pnpm format
```

Formats all code files using Prettier

```bash
pnpm format:check
```

Checks if files are properly formatted without modifying them

## Installation Commands

### Install Dependencies

```bash
pnpm install
```

Installs all project dependencies

## System Utilities (macOS/Darwin)

### Git Commands

- `git status` - Check repository status
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote

### File Operations

- `ls` - List files and directories
- `cd` - Change directory
- `mkdir` - Create directory
- `rm` - Remove files/directories
- `mv` - Move/rename files

### Search Commands

- `grep` - Search text in files (use ripgrep `rg` if available)
- `find` - Find files by name

## Deployment

### Vercel Deployment

```bash
vercel          # Deploy to preview
vercel --prod   # Deploy to production
```

## Troubleshooting

### Clear Build Cache

```bash
rm -rf .next node_modules
pnpm install
```

### Increase Memory for Build

```bash
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```
