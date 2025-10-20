export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

export const energyLevelOf = (energy: number) =>
  energy <= 30 ? 'low' : energy <= 70 ? 'ok' : 'high'

export const heightFromValue = (v: number) => {
  if (v >= 25) return 5
  if (v >= 20) return 4
  if (v >= 15) return 3
  return 2
}

// ----- State helpers ----------------------------------------------------------

export const pickRandom = <T>(arr: readonly T[]): T => {
  if (arr.length === 0) {
    throw new Error('pickRandom: empty array')
  }
  return arr[Math.floor(Math.random() * arr.length)]!
}

export const computeLayout = (cols: number, rows: number) => {
  const COLS = Math.max(48, cols)
  const ROWS = Math.max(18, rows)
  const groundRow = ROWS - 3
  const skyTop = 2
  const catX = Math.min(10, Math.floor(COLS / 6))
  return { cols: COLS, rows: ROWS, groundRow, skyTop, catX }
}