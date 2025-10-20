import { CONFIG } from '../config.js'
import { clamp, energyLevelOf } from '../utils.js'

export type EnergyLevel = 'low' | 'ok' | 'high'

export function clampEnergy(
  energy: number,
  max: number = CONFIG.ENERGY_MAX
): number {
  return clamp(energy, 0, max)
}

export function getEnergyLevel(energy: number): EnergyLevel {
  return energyLevelOf(energy)
}

export function applyEnergy(
  energy: number,
  delta: number,
  max: number = CONFIG.ENERGY_MAX
) {
  const next = clampEnergy(energy + delta, max)
  return { energy: next, level: getEnergyLevel(next) }
}

export const isDepleted = (energy: number) => energy <= 0

export function computeEnergyBar(energy: number, cols: number) {
  const totalCells = Math.min(
    CONFIG.HUD_MAX,
    Math.max(CONFIG.HUD_MIN, Math.floor(cols / 4))
  )
  const filled = Math.round((energy / CONFIG.ENERGY_MAX) * totalCells)
  return { totalCells, filled }
}
