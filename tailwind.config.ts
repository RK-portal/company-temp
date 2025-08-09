import type { Config } from 'tailwindcss';
import brandTokens from './tokens/brand.json';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: brandTokens.colors.primary,
        secondary: brandTokens.colors.secondary,
        neutral: brandTokens.colors.neutral,
        success: brandTokens.colors.success,
        warning: brandTokens.colors.warning,
        error: brandTokens.colors.error,
        white: brandTokens.colors.white,
        black: brandTokens.colors.black,
      },
      fontFamily: {
        sans: [brandTokens.typography.fontFamily.base],
        mono: [brandTokens.typography.fontFamily.mono],
      },
      fontSize: brandTokens.typography.fontSize,
      fontWeight: brandTokens.typography.fontWeight,
      lineHeight: brandTokens.typography.lineHeight,
      spacing: brandTokens.spacing,
      borderRadius: brandTokens.borderRadius,
      boxShadow: brandTokens.boxShadow,
    },
    screens: brandTokens.breakpoints,
  },
  plugins: [],
};

export default config;