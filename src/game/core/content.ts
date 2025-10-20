import type { Color } from './types.js'

export const CONTENT = {
  drains: [
    {
      label: '실내에 사람이 너무 많거나 소란스러운 환경에 있기',
      glyph: '👥',
      value: -15,
      h: 4,
    } as const,
    {
      label: '신뢰할 수 없는 사람과 소통하기',
      glyph: '🫠',
      value: -20,
      h: 4,
    } as const,
    { label: '맛없는 음식 먹기', glyph: '🍽️', value: -10, h: 3 } as const,
  ],
  boosts: [
    {
      label: '정독도서관 가서 벤치에서 책 읽기',
      glyph: '📚',
      value: +15,
    } as const,
    {
      label: '남산도서관 야외 공간에서 책 읽기',
      glyph: '🏛️',
      value: +15,
    } as const,
    { label: '요가에서 "나메스떼"하기', glyph: '🧘', value: +15 } as const,
    { label: '내 생각 정리하면서 일기 쓰기', glyph: '✍️', value: +20 } as const,
    {
      label: '사장님만의 철학이 있는 개인 카페 가보기',
      glyph: '☕',
      value: +10,
    } as const,
    { label: '산책하면서 생각 정리하기', glyph: '🚶', value: +15 } as const,
  ] as const,
} as const

export const boostColorFromLabelOrGlyph = (
  _label: string,
  glyph: string
): Color => {
  if (glyph === '📚') return 'blue' // 정독도서관
  if (glyph === '🏛️') return 'cyan' // 남산도서관
  if (glyph === '🧘') return 'magenta' // 요가
  if (glyph === '✍️') return 'yellow' // 일기쓰기
  if (glyph === '☕') return 'green' // 개인카페
  if (glyph === '🚶') return 'white' // 산책
  return 'green'
}
