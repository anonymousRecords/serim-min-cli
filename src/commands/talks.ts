import chalk from 'chalk'
import { talks, type TalkItem } from '../data/talks.js'
import { header, line, sleep, sortByDate, typeOut } from '../utils/io.js'

async function renderCardRhythm(t: TalkItem, speed = 4) {
  console.log(
    `${chalk.gray(t.date)}  ${chalk.bold(t.event)} ${chalk.dim(t.role ? `· ${t.role}` : '')}`
  )
  await typeOut(chalk.cyan(`「${t.title}」`), speed)

  for (const b of t.bullets) {
    await sleep(180)
    await typeOut(chalk.cyan(`- ${b}`), speed)
  }
  if (t.takeaway) {
    await sleep(160)
    await typeOut(chalk.green(`=> ${t.takeaway}`), speed)
  }
}

export async function runTalks(
  opts: {
    topic?: string
    year?: string
    order?: 'asc' | 'desc'
    gap?: number
    speed?: number
  } = {}
) {
  header('🗣️', '민세림의 발표 로그')

  let list = talks.slice()
  if (opts.topic) list = list.filter((t) => t.topicTags?.includes(opts.topic!))
  if (opts.year) list = list.filter((t) => t.date.startsWith(opts.year! + '.'))

  if (!list.length) {
    console.log(chalk.dim('표시할 발표가 없어요. 필터를 조정해 보세요.'))
    line(chalk.gray)
    return
  }

  list = sortByDate(list, opts.order || 'asc')

  const gap = Number.isFinite(opts.gap) ? (opts.gap as number) : 1200
  const speed = Number.isFinite(opts.speed) ? (opts.speed as number) : 6

  let i = 0
  for (const t of list) {
    await renderCardRhythm(t, speed)
    if (i++ < list.length - 1) {
      line(chalk.gray)
      await sleep(gap)
    }
  }

  line(chalk.gray)
}
