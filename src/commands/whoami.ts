import prompts from 'prompts'
import chalk from 'chalk'
import { line, sleep, typeOut } from '../utils/io.js'
import { QUESTIONS, type Answer, type Q } from '../data/whoami.js'

async function askUntilCorrect(q: Q) {
  while (true) {
    const { ans }: { ans: Answer } = await prompts({
      type: 'select',
      name: 'ans',
      message: q.message,
      choices: q.choices,
    })

    // ESC나 Ctrl+C로 나갔을 때
    if (ans === undefined) {
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: '테스트를 종료할까요?',
        initial: true,
      })
      if (confirm) throw new Error('USER_ABORT')
      else continue
    }

    if (ans === q.correct) {
      console.log(
        chalk.green('✅ 정답이에요. 민세림에 대해 더 잘 알게 되었어요.')
      )
      await typeOut(chalk.cyan(`→ ${q.feedback}`), 8)
      if (q.note) await typeOut(chalk.dim(`   ${q.note}`), 6)
      console.log()
      await sleep(250)
      return true
    } else {
      console.log(chalk.red('❌ 민세림에 대해 틀렸어요. 다시 시도해볼까요?'))
      await sleep(200)
    }
  }
}

export async function runWhoAmI() {
  console.log(chalk.bold.green('🧪 민세림 탐구 영역'))
  console.log(chalk.gray('민세림에 대해 얼마나 알고 있나요? (3문항)'))
  line(chalk.gray)
  await sleep(400)

  try {
    for (const q of QUESTIONS) {
      await askUntilCorrect(q)
      line(chalk.white)
    }

    console.log(chalk.bold('🎉 민세림 탐구 영역을 수료했습니다.'))
    await sleep(400)
    await typeOut(
      chalk.bold.magenta(
        '→ "민세림은 `좋아해서 만드는 사람`이라고 기억해주세요."'
      ),
      12
    )
    console.log()

    await sleep(400)
    console.log(chalk.dim('💬 민세림은 이런 사람이에요'))
    await typeOut('• 프로덕트 중심으로 사고해요', 8)
    await typeOut('• 아는 감각을 좋아해요', 8)
    await typeOut('• 동료에게 안정감을 선물하고 싶어요', 8)
    line(chalk.gray)
  } catch (e: any) {
    if (e?.message === 'USER_ABORT') {
      console.log(chalk.dim('테스트가 취소되었습니다.'))
    } else {
      console.log(chalk.red('예상치 못한 오류가 발생했습니다.'))
    }
  }
}
