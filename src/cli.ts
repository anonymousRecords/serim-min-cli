#!/usr/bin/env node
import { Command } from 'commander'
import { renderWhoAmI } from './commands/whoami.js'
import { version } from './utils/version.js'

const program = new Command()
  .name('minserim')
  .description('CLI about Serim Min')
  .version(version)

program
  .command('whoami')
  .description('Who is Serim Min?')
  .action(() => console.log(renderWhoAmI()))

program.parse()
