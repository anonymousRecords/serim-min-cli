import type { Color } from '../../core/types.js'

const ESC = '\u001b['
export const hideCursor = () => process.stdout.write(`${ESC}?25l`)
export const showCursor = () => process.stdout.write(`${ESC}?25h`)
export const clear = () => process.stdout.write(`${ESC}2J${ESC}H`)
export const moveTo = (r: number, c: number) =>
  process.stdout.write(`${ESC}${r};${c}H`)

// ANSI colors
const ANSI = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
} as const

export const colorize = (s: string, c?: Color) =>
  c ? `${ANSI[c]}${s}${ANSI.reset}` : s

export const drawText = (r: number, c: number, text: string) => {
  moveTo(r, c)
  process.stdout.write(text)
}
