import type { Color } from './types.js'

export const CONTENT = {
  drains: [
    {
      label: '시끄러운 환경',
      glyph: '[!!]',
      value: -15,
      h: 4,
    } as const,
    {
      label: '신뢰 못할 사람',
      glyph: '[XX]',
      value: -20,
      h: 4,
    } as const,
    { label: '맛없는 음식', glyph: '[--]', value: -10, h: 3 } as const,
  ],
  boosts: [
    {
      label: '정독도서관',
      glyph: '[BK]',
      value: +15,
    } as const,
    {
      label: '남산도서관',
      glyph: '[LB]',
      value: +15,
    } as const,
    { label: '요가', glyph: '[YG]', value: +15 } as const,
    { label: '일기쓰기', glyph: '[WR]', value: +20 } as const,
    {
      label: '개인카페',
      glyph: '[CF]',
      value: +10,
    } as const,
    { label: '산책', glyph: '[WK]', value: +15 } as const,
  ] as const,
} as const

export const boostColorFromLabelOrGlyph = (
  _label: string,
  glyph: string
): Color => {
  if (glyph === '[BK]') return 'blue'    // 정독도서관
  if (glyph === '[LB]') return 'cyan'    // 남산도서관
  if (glyph === '[YG]') return 'magenta' // 요가
  if (glyph === '[WR]') return 'yellow'  // 일기쓰기
  if (glyph === '[CF]') return 'green'   // 개인카페
  if (glyph === '[WK]') return 'white'   // 산책
  return 'green'
}
