import type { GameAction } from '../../core/update.js'

export type StopFn = () => void

export function attachKeyboard(
  onAction: (a: GameAction) => void,
  onQuit: () => void
): StopFn {
  const handler = (buf: Buffer) => {
    const s = buf.toString()
    const isSpace = buf[0] === 32 || s === ' '
    const isUp = s.includes('\u001b[A') // ↑ arrow

    // Quit
    if (s === 'q' || s === 'Q' || buf[0] === 3) {
      onQuit()
      return
    }

    if (s === 'r' || s === 'R') {
      onAction({ type: 'RESTART' })
      return
    }

    if (isSpace || isUp) {
      onAction({ type: 'JUMP' })
      return
    }
  }

  if (process.stdin.isTTY) process.stdin.setRawMode?.(true)
  process.stdin.resume()
  process.stdin.on('data', handler)

  return () => {
    try {
      if (process.stdin.isTTY) process.stdin.setRawMode?.(false)
      process.stdin.off('data', handler)
      process.stdin.pause()
    } catch {}
  }
}
