# Task Completion Checklist

When completing any development task in this project, follow these steps:

## 1. Code Quality Checks

### Run Type Checking
```bash
pnpm typecheck
```
Ensure there are no TypeScript errors. All code must pass strict type checking.

### Run Linting
```bash
pnpm lint
```
Fix any ESLint errors or warnings. The code must pass all linting rules.

### Format Code
```bash
pnpm format
```
Ensure all code is properly formatted according to Prettier configuration.

## 2. Build Verification

### Test Production Build
```bash
pnpm build
```
Verify that the production build completes successfully without errors.

## 3. Manual Testing

- Test the feature/fix in development mode (`pnpm dev`)
- Check responsive behavior on different screen sizes
- Verify accessibility (keyboard navigation, screen reader compatibility)
- Test in multiple browsers if applicable

## 4. Code Review Checklist

Before marking a task as complete:
- [ ] All TypeScript types are properly defined
- [ ] No `any` types unless absolutely necessary
- [ ] Imports are properly ordered (ESLint will check this)
- [ ] Component follows existing patterns in the codebase
- [ ] No console.log statements left in code
- [ ] Error handling is implemented where needed
- [ ] Loading states are handled for async operations

## 5. Documentation

- Update README.md if adding new features or changing setup
- Add comments only for complex logic that isn't self-explanatory
- Update type definitions if modifying data structures

## Important Notes

- **Never commit code that fails typecheck or lint**
- **Always run the build command before considering a task complete**
- **If unable to run these commands, ask the user for the correct commands**
- **Consider writing these commands to CLAUDE.md for future reference**