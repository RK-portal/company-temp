export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

export interface Colors {
  primary: ColorScale
  secondary: ColorScale
  neutral: ColorScale
  success: ColorScale
  warning: ColorScale
  error: ColorScale
  white: string
  black: string
}

export interface Typography {
  fontFamily: {
    base: string
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
    '6xl': string
    '7xl': string
    '8xl': string
    '9xl': string
  }
  fontWeight: {
    thin: string
    light: string
    normal: string
    medium: string
    semibold: string
    bold: string
    extrabold: string
    black: string
  }
  lineHeight: {
    none: string
    tight: string
    snug: string
    normal: string
    relaxed: string
    loose: string
  }
}

export interface Spacing {
  '0': string
  px: string
  '0.5': string
  '1': string
  '1.5': string
  '2': string
  '2.5': string
  '3': string
  '3.5': string
  '4': string
  '5': string
  '6': string
  '7': string
  '8': string
  '9': string
  '10': string
  '11': string
  '12': string
  '14': string
  '16': string
  '20': string
  '24': string
  '28': string
  '32': string
  '36': string
  '40': string
  '44': string
  '48': string
  '52': string
  '56': string
  '60': string
  '64': string
  '72': string
  '80': string
  '96': string
}

export interface BorderRadius {
  none: string
  sm: string
  DEFAULT: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  full: string
}

export interface BoxShadow {
  sm: string
  DEFAULT: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
  none: string
}

export interface Breakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface DesignTokens {
  colors: Colors
  typography: Typography
  spacing: Spacing
  borderRadius: BorderRadius
  boxShadow: BoxShadow
  breakpoints: Breakpoints
}
