import { initialState, reduce } from './core/update.js'
import { TerminalRenderer } from './io/terminal/renderer.js'
import { attachKeyboard } from './io/terminal/keyboard.js'
import { showCursor } from './io/terminal/terminal.js'

export async function runGame() {
  let state = initialState({
    cols: process.stdout.columns || 80,
    rows: process.stdout.rows || 24,
  })

  let running = true
  const renderer = new TerminalRenderer()

  // cleanup ----------------------
  const cleanup = () => {
    try {
      showCursor()
      process.stdout.write('\n')
    } catch {}
  }

  // input ------------------------
  const stopInput = attachKeyboard(
    (a) => {
      state = reduce(state, a)
    },
    () => {
      running = false
    }
  )

  // main loop --------------------
  const FPS = 30
  const interval = Math.floor(1000 / FPS)
  renderer.begin()
  let id: NodeJS.Timeout | undefined

  const loop = () => {
    if (!running) {
      if (id) clearInterval(id)
      stopInput()
      cleanup()
      return
    }
    state = reduce(state, { type: 'TICK', dt: 1 / FPS })
    renderer.render(state)
  }

  id = setInterval(loop, interval)

  // OS signals -------------------
  ;(['SIGINT', 'SIGTERM', 'SIGHUP'] as const).forEach((sig) =>
    process.on(sig, () => {
      running = false
    })
  )
}
