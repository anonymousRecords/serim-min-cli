import type { Color, Obstacle } from '../types.js'

export function stepObstacles(obstacles: Obstacle[], speed: number): void {
  const dx = 1.4 + 0.18 * speed
  for (const o of obstacles) {
    o.x -= dx
  }
  while (obstacles.length && obstacles[0]!.x < 0) {
    obstacles.shift()
  }
}

export function spawnOneObstacle(opts: {
  isDrain: boolean
  COLS: number
  speed: number
  pickDrain: () => { label: string; glyph: string; value: number; h?: number }
  pickBoost: () => { label: string; glyph: string; value: number }
  heightFromValue: (v: number) => number
  colorFrom: (label: string, glyph: string) => Color
}): Obstacle {
  const { isDrain, COLS, pickDrain, pickBoost, heightFromValue, colorFrom } = opts
    if (isDrain) {
    const d = pickDrain()
    return {
      x: COLS - 2,
      h: heightFromValue(d.value),
      kind: 'drain',
      label: d.label,
      value: d.value,
      glyph: d.glyph,
      color: 'red',
    }
  } else {
    const b = pickBoost()
    return {
      x: COLS - 2,
      h: heightFromValue(b.value),
      kind: 'boost',
      label: b.label,
      value: b.value,
      glyph: b.glyph,
      color: colorFrom(b.label, b.glyph),
    }
  }
}