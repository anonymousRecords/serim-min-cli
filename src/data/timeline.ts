export type TLType = 'project' | 'oss'

export interface TLItem {
  id: string
  type: TLType
  title: string
  description?: string
  period: { from: string; to?: string } // 'YYYY.MM'
  role: string
  highlights: string[]
  storyNote?: string
}

export const timeline: TLItem[] = [
  {
    id: 'najakgil',
    type: 'project',
    title: '나작길',
    description: '나만의 작은 총장님 만들기',
    period: { from: '2024.07', to: '2025.02' },
    role: 'Product & Frontend',
    highlights: [
      '참여형 베타로 실제 유저 피드백 수집/반영',
      '가천대 “이길여 총장님 꾸미기” 이벤트로 트래픽/후기 확보',
      'Fabric.js, Native Canvas 등 다양한 시도',
    ],
    storyNote: '유저 반응은 코드보다 빠르다.',
  },
  {
    id: 'notionpresso',
    type: 'oss',
    title: 'NotionPresso',
    description: '손쉽게 Notion을 나만의 웹사이트로! Notion CMS 서비스',
    period: { from: '2024.08', to: 'current' },
    role: 'Maintainer',
    highlights: [
      '문서/커뮤니티/발표를 잇는 “서비스형 오픈소스” 운영',
      'Notion-like UI · 기여 유도 구조',
    ],
    storyNote: '오픈소스도 하나의 서비스다.',
  },
  {
    id: 'swaggerchat',
    type: 'oss',
    title: 'SwaggerChat',
    description: '더이상 API 문서 읽지 말고, AI에게 물어보세요!',
    period: { from: '2024.12', to: '2025.03' },
    role: 'Maintainer',
    highlights: [
      'Swagger URL/파일 연결 즉시 AI 대화 시작 UX',
      'API KEY 유출 방지 구조 설계',
    ],
    storyNote: '빨리 써보게 하고, 서비스 가치를 검증한다.',
  },
]
