export type Color =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'

export type ObstacleKind = 'boost' | 'drain'

export type GamePhase = 'playing' | 'over'

export type Obstacle = {
  x: number
  h: number
  kind: ObstacleKind
  label: string
  value: number
  glyph: string
  color?: Color
}
