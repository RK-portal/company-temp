import { DesignTokens, Colors, ColorScale } from '@/types/tokens'

import brandTokens from '../tokens/brand.json'

export const tokens: DesignTokens = brandTokens as DesignTokens

/**
 * カラースケールをCSS変数に変換
 */
function colorScaleToCSSVars(name: string, scale: ColorScale): Record<string, string> {
  const vars: Record<string, string> = {}
  Object.entries(scale).forEach(([key, value]) => {
    vars[`--color-${name}-${key}`] = value
  })
  return vars
}

/**
 * トークンをCSS変数に変換
 */
export function tokensToCSSVars(): string {
  const cssVars: Record<string, string> = {}

  // Colors
  Object.entries(tokens.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      cssVars[`--color-${colorName}`] = colorValue
    } else {
      Object.assign(cssVars, colorScaleToCSSVars(colorName, colorValue as ColorScale))
    }
  })

  // Typography
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value
  })

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars[`--font-weight-${key}`] = value
  })

  Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
    cssVars[`--line-height-${key}`] = value
  })

  // Font Family
  cssVars['--font-family-base'] = tokens.typography.fontFamily.base
  cssVars['--font-family-mono'] = tokens.typography.fontFamily.mono

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value
  })

  // Border Radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    const varKey = key === 'DEFAULT' ? '--radius' : `--radius-${key}`
    cssVars[varKey] = value
  })

  // Box Shadow
  Object.entries(tokens.boxShadow).forEach(([key, value]) => {
    const varKey = key === 'DEFAULT' ? '--shadow' : `--shadow-${key}`
    cssVars[varKey] = value
  })

  // Breakpoints
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    cssVars[`--breakpoint-${key}`] = value
  })

  return Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
}

/**
 * Tailwind configに適用するための変換
 */
export function tokensToTailwindConfig() {
  return {
    colors: {
      primary: Object.entries(tokens.colors.primary).reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as Record<string, string>
      ),
      secondary: Object.entries(tokens.colors.secondary).reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as Record<string, string>
      ),
      neutral: Object.entries(tokens.colors.neutral).reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as Record<string, string>
      ),
      success: Object.entries(tokens.colors.success).reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as Record<string, string>
      ),
      warning: Object.entries(tokens.colors.warning).reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as Record<string, string>
      ),
      error: Object.entries(tokens.colors.error).reduce(
        (acc, [key, value]) => {
          acc[key] = value
          return acc
        },
        {} as Record<string, string>
      ),
      white: tokens.colors.white,
      black: tokens.colors.black,
    },
    fontFamily: {
      sans: [tokens.typography.fontFamily.base],
      mono: [tokens.typography.fontFamily.mono],
    },
    fontSize: tokens.typography.fontSize,
    fontWeight: tokens.typography.fontWeight,
    lineHeight: tokens.typography.lineHeight,
    spacing: tokens.spacing,
    borderRadius: tokens.borderRadius,
    boxShadow: tokens.boxShadow,
    screens: tokens.breakpoints,
  }
}
