import { version } from '../utils/version.js'

export function renderWhoAmI() {
  return [
    `Serim Min v${version}`,
    '---------------------------',
    'name:     "민세림 (Serim Min)"',
    'role:     "Frontend Engineer"',
    'motto:    "Build what I love"',
    'github:   "https://github.com/anonymousRecords"',
    'status:   "debugging life()"',
  ].join('\n')
}
