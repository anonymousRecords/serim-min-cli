import { CONFIG } from '../core/config.js'
import { applyPhysics, onJump } from '../core/systems/physics.js'
import { collide } from '../core/systems/collisions.js'
import { stepObstacles, spawnOneObstacle } from '../core/systems/obstacles.js'
import { stepScoreAndSpeed } from '../core/systems/scoring.js'
import {
  applyEnergy,
  clampEnergy,
  getEnergyLevel,
  isDepleted,
} from '../core/systems/energy.js'
import { CONTENT, boostColorFromLabelOrGlyph } from '../core/content.js'
import type { Obstacle, GamePhase } from '../core/types.js'
import { computeLayout, heightFromValue, pickRandom } from './utils.js'

// ----- Types -----------------------------------------------------------------

export type GameAction =
  | { type: 'TICK'; dt: number }
  | { type: 'JUMP' }
  | { type: 'RESTART' }
  | { type: 'RESIZE'; cols: number; rows: number }

export type GameState = {
  // viewport & layout
  cols: number
  rows: number
  groundRow: number
  skyTop: number
  catX: number

  // runner physics
  catY: number
  velY: number
  grounded: boolean

  // meta
  phase: GamePhase
  running: boolean
  score: number
  best: number
  speed: number
  tick: number

  // resources
  energy: number
  obstacles: Obstacle[]
  logs: string[] // recent events
}

// ----- State helpers ----------------------------------------------------------

const pushLog = (s: GameState, line: string) => {
  s.logs.push(line)
  if (s.logs.length > 4) s.logs.shift()
}

// ----- Initial & Reset --------------------------------------------------------

export function initialState(opts?: {
  cols?: number
  rows?: number
}): GameState {
  const layout = computeLayout(opts?.cols ?? 80, opts?.rows ?? 24)
  return {
    ...layout,
    catY: 0,
    velY: 0,
    grounded: true,
    phase: 'playing',
    running: true,
    score: 0,
    best: 0,
    speed: 1.0,
    tick: 0,
    energy: 70,
    obstacles: [],
    logs: ['🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱'],
  }
}

function resetGame(s: GameState) {
  s.catY = 0
  s.velY = 0
  s.grounded = true
  s.phase = 'playing'
  s.score = 0
  s.speed = 1.0
  s.tick = 0
  s.energy = clampEnergy(70)
  s.obstacles.length = 0
  s.logs.length = 0
  pushLog(s, '✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
}

// ----- Systems orchestration --------------------------------------------------

function maybeSpawn(s: GameState) {
  const spawnInterval = Math.max(8, 14 - Math.floor(s.speed))
  const shouldSpawn = s.tick % spawnInterval === 0

  if (!shouldSpawn) return

  // maintain minimum gap
  const minGap = Math.max(18, 28 - s.speed * 3)
  const last = s.obstacles.at(-1)
  if (last && last.x >= s.cols - minGap) return

  const isDrain = Math.random() < 0.65
  const ob = spawnOneObstacle({
    isDrain,
    COLS: s.cols,
    speed: s.speed,
    pickDrain: () => pickRandom(CONTENT.drains),
    pickBoost: () => pickRandom(CONTENT.boosts),
    heightFromValue,
    colorFrom: boostColorFromLabelOrGlyph,
  })
  s.obstacles.push(ob)
}

function processCollisions(s: GameState) {
  for (let i = 0; i < s.obstacles.length; i++) {
    const o = s.obstacles[i]
    if (!o) return

    if (
      collide(o, {
        CAT_X: s.catX,
        GROUND_ROW: s.groundRow,
        catY: s.catY,
      })
    ) {
      // apply energy delta and log
      const { energy } = applyEnergy(s.energy, o.value, CONFIG.ENERGY_MAX)
      s.energy = energy
      if (o.kind === 'drain') pushLog(s, `⚠️  ${o.label} ${o.value}`)
      else pushLog(s, `🧚  ${o.label} +${o.value}`)

      // consume obstacle
      s.obstacles.splice(i, 1)
      i--

      // game over?
      if (isDepleted(s.energy)) {
        s.phase = 'over'
        s.best = Math.max(s.best, s.score)
        pushLog(s, '에너지가 바닥났어요… 💫')
        return
      }
    }
  }
}

// ----- Reducer ---------------------------------------------------------------

export function reduce(state: GameState, action: GameAction): GameState {
  const s = { ...state, obstacles: [...state.obstacles], logs: [...state.logs] }

  switch (action.type) {
    case 'RESIZE': {
      const layout = computeLayout(action.cols, action.rows)
      s.cols = layout.cols
      s.rows = layout.rows
      s.groundRow = layout.groundRow
      s.skyTop = layout.skyTop
      s.catX = layout.catX
      return s
    }

    case 'RESTART': {
      resetGame(s)
      return s
    }

    case 'JUMP': {
      const j = onJump(s.grounded, s.catY, s.velY, {
        JUMP_VEL: CONFIG.JUMP_VEL,
        MAX_JUMP: CONFIG.MAX_JUMP,
      })
      s.velY = j.velY
      s.grounded = j.grounded
      return s
    }

    case 'TICK': {
      if (s.phase !== 'playing') {
        return s
      }

      // 1) physics
      const p = applyPhysics(s.catY, s.velY, s.grounded, {
        GRAVITY: CONFIG.GRAVITY,
        MAX_JUMP: CONFIG.MAX_JUMP,
        EPS: CONFIG.EPS,
      })
      s.catY = p.catY
      s.velY = p.velY
      s.grounded = p.grounded

      // 2) spawn/move/cull
      maybeSpawn(s)
      stepObstacles(s.obstacles, s.speed)

      // 3) collisions & energy/logs
      processCollisions(s)
      if (s.phase !== 'playing') return s

      // 4) score & speed progression
      const ss = stepScoreAndSpeed(s.score, s.speed)
      s.score = ss.score
      s.speed = ss.speed

      // 5) tick
      s.tick++
      return s
    }
  }
}

export function getHUDStatus(s: GameState) {
  const level = getEnergyLevel(s.energy)
  return level === 'low' ? '🔴 low' : level === 'ok' ? '🟡 ok' : '🟢 high'
}
