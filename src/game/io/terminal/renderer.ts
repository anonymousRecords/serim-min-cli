import type { GameState } from '../../core/update.js'
import {
  drawText,
  clear,
  hideCursor,
  showCursor,
  colorize,
} from './terminal.js'
import { getHUDStatus } from '../../core/update.js'
import { computeEnergyBar } from '../../core/systems/energy.js'

export class TerminalRenderer {
  begin() {
    hideCursor()
    clear()
  }

  end() {
    showCursor()
    process.stdout.write('\n')
  }

  render(s: GameState) {
    clear()
    this.renderHUD(s)
    this.drawGround(s)
    this.drawRunner(s)
    for (const o of s.obstacles) this.drawObstacle(s, o)
  }

  private renderHUD(s: GameState) {
    // energy bar
    const { totalCells, filled } = computeEnergyBar(s.energy, s.cols)
    const bar = '█'.repeat(filled) + '░'.repeat(totalCells - filled)

    const status = getHUDStatus(s)
    drawText(
      s.skyTop,
      2,
      `energy ${s.energy.toString().padStart(3, ' ')} / 100  [${bar}]  ${status}   score: ${s.score
        .toString()
        .padStart(6, '0')}  best: ${s.best.toString().padStart(6, '0')}`
    )

    if (s.phase === 'playing') {
      drawText(
        s.skyTop + 1,
        2,
        `controls: [space]/[↑] jump, [r] restart, [q] quit   tip: 빨강 박스는 피하고, 컬러 박스(부스트)는 맞으면 이득!`
      )
    } else {
      drawText(s.skyTop + 1, 2, `GAME OVER — press [r] to retry, [q] to quit`)
    }

    // event log
    const startRow = s.skyTop + 3
    drawText(startRow - 1, 2, 'recent events:')
    for (let i = 0; i < 4; i++) {
      const line = s.logs[i] ?? ''
      drawText(startRow + i, 4, line.padEnd(s.cols - 6, ' '))
    }
  }

  private drawGround(s: GameState) {
    drawText(s.groundRow, 1, '_'.repeat(s.cols))
  }

  private drawRunner(s: GameState) {
    const feetRow = s.groundRow - Math.round(s.catY)
    const bodyRow = Math.max(s.skyTop, feetRow - 1)
    const headRow = Math.max(s.skyTop, bodyRow - 1)

    drawText(headRow, s.catX, '(=^･ω･^)')
    drawText(bodyRow, s.catX, ' /|   |\\ ')
  }

  private drawObstacle(s: GameState, o: GameState['obstacles'][number]) {
    const x = Math.round(o.x)
    if (x > s.cols) return

    const OBSTACLE_WIDTH = 4
    const topRow = Math.max(s.skyTop, s.groundRow - (o.h - 1))
    const fill = '█'.repeat(OBSTACLE_WIDTH)
    const block = colorize(fill, o.color)

    // vertical block
    for (let r = s.groundRow; r >= topRow; r--) {
      if (r < s.skyTop) break
      if (x >= 1) drawText(r, x, block)
    }

    // icon at top
    const iconCol = Math.max(1, x + Math.floor((OBSTACLE_WIDTH - 1) / 2))
    const iconRow = Math.max(s.skyTop, topRow - 1)
    if (x >= 1 && x <= s.cols) drawText(iconRow, iconCol, o.glyph)
  }
}
