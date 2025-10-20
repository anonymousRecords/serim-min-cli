#!/usr/bin/env node
import { Command } from 'commander'
import { version } from './utils/version.js'
import { runWhoAmI } from './commands/whoami.js'
import { runTalks } from './commands/talks.js'
import { runTimeline } from './commands/timeline.js'
import { runRecommend } from './commands/recommend.js'
import { runRunner } from './commands/runner.js'

const program = new Command()
  .name('minserim')
  .description('CLI about Serim Min')
  .version(version)

program
  .command('whoami')
  .description('민세림은 어떤 사람일까요?')
  .action(runWhoAmI)

program
  .command('timeline')
  .description('주요 개발 경험 타임라인 (Enter로 한 항목씩 보기)')
  .option('--all', '한꺼번에 보기')
  .option('--reverse', '최신순으로 보기')
  .action(runTimeline)

program
  .command('talks')
  .description('발표 아카이빙')
  .option('--topic <tag>', '주제 태그 필터 (예: open-source)')
  .option('--year <yyyy>', '연도 필터 (예: 2025)')
  .option('--desc', '최신순으로 보기')
  .action((opts) => {
    const order = opts.desc ? 'desc' : 'asc'
    runTalks({ ...opts, order })
  })

program
  .command('runner')
  .description('민세림이 좋아하고 싫어하는 것들을 알아보는 러너')
  .action(() => void runRunner())

program
  .command('recommend')
  .description('민세림에 대한 추천사 보기')
  .action(runRecommend)

program.parse()
