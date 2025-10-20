export interface TalkItem {
  id: string
  date: string
  event: string
  title: string
  bullets: string[]
  role?: string
  takeaway?: string
  topicTags?: string[]
}

export const talks: TalkItem[] = [
  {
    id: 'gdg-8th-20250529',
    date: '2025.05.29',
    event: 'GDG on Campus 24-25 8th Connect Session',
    title: '선착순 오픈소스 기여자 모집합니다',
    bullets: ['초보자도 기여할 수 있도록 구조 설계한 경험 발표'],
    role: 'Speaker',
    takeaway: '진입장벽을 낮추면 커뮤니티가 살아난다.',
    topicTags: ['open-source', 'community', 'onboarding'],
  },
  {
    id: 'apdankon-20241214',
    date: '2024.12.14',
    event: '앞단콘 2024',
    title: '나만없어 블로그',
    bullets: ['실제 고충에서 출발한 오픈소스 실제 사례 공유'],
    role: 'Speaker',
    takeaway: '오픈소스도 하나의 서비스다.',
    topicTags: ['open-source', 'notionpresso', 'branding'],
  },
]
