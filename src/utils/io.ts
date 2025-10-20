import readline from 'node:readline'
import type { ChalkInstance } from 'chalk'
import chalk from 'chalk'

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export function line(color: ChalkInstance) {
  console.log(color('──────────────────────────────────────────────'))
}

export async function typeOut(line: string, speedMs = 10) {
  for (const ch of line) {
    process.stdout.write(ch)
    await sleep(speedMs)
  }
  process.stdout.write('\n')
}

export async function waitForEnter(message = 'Press [Enter] to continue...') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  await new Promise<void>((resolve) => {
    rl.question(message + ' ', () => {
      rl.close()
      resolve()
    })
  })
}

export function header(icon: string, title: string, color?: ChalkInstance) {
  const colorFn = color || chalk.bold.yellowBright
  line(chalk.gray)
  console.log(`${icon}  ${colorFn(title)}`)
  line(chalk.gray)
}

export function sortByDate<T extends { date: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const sorted = items.slice().sort((a, b) => a.date.localeCompare(b.date))
  return order === 'desc' ? sorted.reverse() : sorted
}

export function sortByPeriod<T extends { period: { from: string } }>(
  items: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const sorted = items
    .slice()
    .sort((a, b) => a.period.from.localeCompare(b.period.from))
  return order === 'desc' ? sorted.reverse() : sorted
}
