import type { Obstacle } from '../types.js'

export function collide(
  obstacle: Obstacle,
  params: { CAT_X: number; GROUND_ROW: number; catY: number }
): boolean {
  const { CAT_X, GROUND_ROW, catY } = params
  const ox = Math.round(obstacle.x)
  const dy = Math.round(catY)

  const CAT_WIDTH = 3
  const OB_WIDTH = 3

  const catLeft = CAT_X
  const catRight = CAT_X + CAT_WIDTH

  const obsLeft = ox
  const obsRight = ox + (OB_WIDTH - 1)
  const obsTop = GROUND_ROW - (obstacle.h - 1)

  const catFeet = GROUND_ROW - dy
  const catHead = catFeet - 1

  const xOverlap = !(catRight < obsLeft || catLeft > obsRight)
  const yOverlap =
    obstacle.kind === 'drain'
      ? !(catHead > GROUND_ROW || catFeet < obsTop)
      : Math.abs(catFeet - obsTop) <= 2 || Math.abs(catHead - obsTop) <= 2

  return xOverlap && yOverlap
}
