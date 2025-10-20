import prompts from 'prompts'
import chalk from 'chalk'
import { recommendations, type RecItem } from '../data/recommendations.js'
import { line, sleep, typeOut } from '../utils/io.js'
import { header } from '../utils/io.js'

function truncate(s: string, n = 60) {
  if (s.length <= n) return s
  return s.slice(0, n - 1) + '…'
}

function choiceTitle(r: RecItem) {
  return `${r.name} — ${truncate(r.quote, 60)}`
}

async function renderDetail(r: RecItem) {
  console.log(
    `${chalk.gray(r.date)}  ${chalk.bold(r.name)} ${chalk.dim(`· ${r.role} · ${r.relation}`)}`
  )
  await typeOut(chalk.cyan(`“${r.details}”`), 8)
  if (r.tags?.length) console.log(chalk.gray(`# ${r.tags.join(' #')}`))
  console.log()
}

export async function runRecommend() {
  header('💬', '민세림에 대한 추천사')

  const list = recommendations
  if (!list.length) {
    console.log(chalk.dim('표시할 추천사가 없어요. 필터를 조정해주시겠어요?'))
    line(chalk.gray)
    return
  }

  while (true) {
    const choices = list.map((r, idx) => ({
      title: choiceTitle(r),
      value: idx,
    }))

    const { idx } = await prompts({
      type: 'select',
      name: 'idx',
      message: '어떤 추천사를 볼까요?',
      choices,
    })

    if (idx === undefined) {
      console.log(chalk.dim('추천사 보기를 종료할게요.'))
      line(chalk.gray)
      return
    }

    line(chalk.gray)
    const item = list[idx]
    if (item) {
      await renderDetail(item)
    }
    line(chalk.gray)

    const { again } = await prompts({
      type: 'confirm',
      name: 'again',
      message: '다른 추천사도 볼까요?',
      initial: false,
    })

    if (!again) {
      console.log(chalk.bold.italic.magenta('추천사 보기 끝!'))
      line(chalk.gray)
      break
    }

    await sleep(150)
  }
}
