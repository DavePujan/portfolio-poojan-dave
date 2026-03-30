export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ')
}
