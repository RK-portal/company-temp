type ClassValue = string | number | boolean | undefined | null | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  inputs.forEach((input) => {
    if (!input) return

    if (typeof input === 'string') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      const result = cn(...input)
      if (result) classes.push(result)
    }
  })

  // Remove duplicates and join
  return Array.from(new Set(classes.join(' ').split(' ').filter(Boolean))).join(' ')
}