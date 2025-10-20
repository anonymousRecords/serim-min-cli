import chalk from 'chalk'
import { sleep, waitForEnter, line, header, sortByPeriod } from '../utils/io.js'
import { timeline, type TLItem } from '../data/timeline.js'

function roleLine(item: TLItem) {
  const tag = item.type === 'oss' ? '오픈소스' : '개인 프로젝트'
  return chalk.dim(`${tag} · ${item.role}`)
}

function renderItem(item: TLItem) {
  console.log(
    `${chalk.gray(item.period.from)} ~ ${chalk.gray(item.period.to)}  ${chalk.bold(item.title)} : ${item.description}`
  )
  console.log(roleLine(item))

  for (const h of item.highlights) {
    console.log(chalk.cyan(`- ${h}`))
  }
  if (item.storyNote) {
    console.log(chalk.green(`=> ${item.storyNote}`))
  }
}

export async function runTimeline(
  opts: { all?: boolean; reverse?: boolean } = {}
) {
  header('🕓', '민세림의 타임라인')
  let items = sortByPeriod(timeline, opts.reverse ? 'desc' : 'asc')
  if (opts.reverse) items.reverse()

  if (opts.all) {
    let i = 0
    for (const item of items) {
      renderItem(item)
      if (i++ < items.length - 1) {
        line(chalk.gray)
        await sleep(200)
      }
    }
  } else {
    let first = true
    for (const item of items) {
      if (!first) {
        line(chalk.gray)
        await waitForEnter(chalk.gray('Press [Enter] to continue...'))
        await sleep(120)
      }
      renderItem(item)
      first = false
    }
  }

  line(chalk.gray)
  console.log(
    chalk.bold.italic.magenta(
      '작고 큰 경험들이 모여서 지금의 민세림이 되었어요'
    )
  )
  line(chalk.gray)
}
