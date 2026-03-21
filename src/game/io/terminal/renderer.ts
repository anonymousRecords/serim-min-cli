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
    this.drawGameOver(s)
  }

  private renderHUD(s: GameState) {
    // 에너지 바
    const { totalCells, filled } = computeEnergyBar(s.energy, s.cols)
    const bar = '█'.repeat(filled) + '░'.repeat(totalCells - filled)

    // 에너지 상태 (색상 + bold)
    const rawStatus = getHUDStatus(s)
    const statusLabel = rawStatus.includes('low')
      ? colorize('[LOW] ', 'red', true)
      : rawStatus.includes('ok')
        ? colorize('[OK]  ', 'yellow', true)
        : colorize('[HIGH]', 'green', true)

    drawText(
      s.skyTop,
      2,
      `ENERGY ${s.energy.toString().padStart(3, ' ')} / 100  [${bar}]  ${statusLabel}  SCORE: ${s.score
        .toString()
        .padStart(6, '0')}  BEST: ${s.best.toString().padStart(6, '0')}  SPD: x${s.speed.toFixed(1)}`
    )

    drawText(
      s.skyTop + 1,
      2,
      `[space]/[up] 점프   [r] 재시작   [q] 종료   |  빨강[drain] 피하기, 컬러[boost] 맞으면 이득`
    )

    // 구분선
    drawText(s.skyTop + 2, 1, '─'.repeat(s.cols - 1))

    // 이벤트 로그 (드레인=빨강, 부스트=초록)
    const startRow = s.skyTop + 3
    drawText(startRow - 0, 2, colorize('recent events:', 'white', true))
    for (let i = 0; i < 4; i++) {
      const line = s.logs[i] ?? ''
      // [-N] 태그는 빨강, [+N] 태그는 초록으로 강조
      const colored = line.startsWith('[-')
        ? colorize(line.padEnd(s.cols - 6, ' '), 'red')
        : line.startsWith('[+')
          ? colorize(line.padEnd(s.cols - 6, ' '), 'green')
          : line.padEnd(s.cols - 6, ' ')
      drawText(startRow + 1 + i, 4, colored)
    }
  }

  private drawGround(s: GameState) {
    drawText(s.groundRow,     1, '═'.repeat(s.cols - 1))
    drawText(s.groundRow + 1, 1, '─'.repeat(s.cols - 1))
  }

  private drawRunner(s: GameState) {
    const feetRow = s.groundRow - Math.round(s.catY)
    const bodyRow = Math.max(s.skyTop, feetRow - 1)
    const headRow = Math.max(s.skyTop, bodyRow - 1)

    const isJumping = !s.grounded
    const isDead    = s.phase === 'over'

    const head = isDead ? '(=x.x=)' : isJumping ? '(=^o^=)' : '(=^.^=)'
    const body = isDead ? ' /   \\  ' : isJumping ? '  ~ w ~  ' : ' > ^ <  '

    drawText(headRow, s.catX, head)
    drawText(bodyRow, s.catX, body)
  }

  private drawObstacle(s: GameState, o: GameState['obstacles'][number]) {
    const x = Math.round(o.x)
    if (x > s.cols) return

    const OBSTACLE_WIDTH = 4
    const topRow = Math.max(s.skyTop, s.groundRow - (o.h - 1))
    const fill = '█'.repeat(OBSTACLE_WIDTH)
    const block = colorize(fill, o.color)

    // 세로 블록
    for (let r = s.groundRow; r >= topRow; r--) {
      if (r < s.skyTop) break
      if (x >= 1) drawText(r, x, block)
    }

    // 상단 glyph (ASCII 태그)
    const iconCol = Math.max(1, x)
    const iconRow = Math.max(s.skyTop, topRow - 1)
    if (x >= 1 && x <= s.cols) {
      const glyphColored = colorize(o.glyph, o.color, true)
      drawText(iconRow, iconCol, glyphColored)
    }
  }

  private drawGameOver(s: GameState) {
    if (s.phase !== 'over') return

    const w = 36
    const col = Math.max(1, Math.floor((s.cols - w) / 2))
    const row = Math.floor((s.groundRow - s.skyTop) / 2) + s.skyTop - 2

    const pad = (text: string) => `║  ${text.padEnd(w - 4, ' ')}  ║`
    const border = '═'.repeat(w - 2)

    drawText(row,     col, colorize(`╔${border}╗`, 'yellow', true))
    drawText(row + 1, col, colorize(pad('    G A M E   O V E R'), 'yellow', true))
    drawText(row + 2, col, colorize(pad(''), 'yellow'))
    drawText(row + 3, col, colorize(pad(`  SCORE : ${s.score.toString().padStart(6, '0')}`), 'yellow'))
    drawText(row + 4, col, colorize(pad(`  BEST  : ${s.best.toString().padStart(6, '0')}`), 'yellow'))
    drawText(row + 5, col, colorize(pad(''), 'yellow'))
    drawText(row + 6, col, colorize(pad('  [r] 다시시작       [q] 종료'), 'yellow'))
    drawText(row + 7, col, colorize(`╚${border}╝`, 'yellow', true))
  }
}
