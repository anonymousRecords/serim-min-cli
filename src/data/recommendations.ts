export interface RecItem {
  id: string
  name: string
  role: string
  relation: string
  date: string
  quote: string
  details: string
  tags?: string[]
  consent?: boolean
}

/**
 * 🎉 민세림에 대한 추천사를 작성해주세요!
 *
 * 아래 템플릿을 복사해서 recommendations 배열에 추가해주시면 됩니다.
 *
 * 작성 가이드:
 * - id: 'rec-YYYY-yourname' 형식 (예: 'rec-2025-john')
 * - name: 실명 또는 이니셜 (예: 'John Kim' 또는 'J.K.')
 * - role: 현재 직책 (예: 'Product Manager', 'Designer')
 * - relation: 민세림과의 관계 (예: '동료', '친구', '멘티', '오픈소스 기여자')
 * - date: 작성 날짜 (YYYY.MM 형식)
 * - quote: 한 줄 요약 (40-60자 정도, 따옴표 없이)
 * - details: 상세 내용 (자유롭게 작성, 경험담이나 구체적인 에피소드 환영!)
 * - tags: 관련 키워드 배열 (선택사항)
 * - consent: 공개 동의 여부 (true로 설정해주세요)
 *
 * 📝 작성 예시:
 * {
 *   id: 'rec-2025-alice',
 *   name: 'Alice Park',
 *   role: 'UX Designer',
 *   relation: '프로젝트 동료',
 *   date: '2025.10',
 *   quote: '세림은 사용자 경험을 최우선으로 생각하는 개발자입니다',
 *   details: '함께 작업하면서 세림이 단순히 기능을 구현하는 것을 넘어서 사용자가 실제로 어떻게 느낄지 고민하는 모습이 인상적이었습니다. 특히 접근성을 고려한 UI 구현에서 깊은 통찰을 보여주었어요.',
 *   tags: ['ux', 'collaboration', 'accessibility'],
 *   consent: true,
 * },
 *
 * 💡 팁:
 * - 구체적인 에피소드나 프로젝트 경험을 포함하면 더 생생해집니다
 * - 민세림의 강점이나 특별한 점을 중심으로 써주세요
 * - 진솔하고 개인적인 경험을 공유해주시면 감사하겠습니다
 *
 * 🙏 작성해주셔서 정말 고맙습니다!
 */

export const recommendations: RecItem[] = [
  {
    id: 'rec-2025-yangteol',
    name: 'Taeyoon Kim.',
    role: 'Frontend Engineer',
    relation: '동아리 동료 및 친구',
    date: '2025.10',
    quote:
      '세림은 경험을 기반으로 창의적인 방법을 통해 목적을 달성하는 개발자입니다',
    details:
      '세림 님을 처음 대면한 것은 동아리에서 프로젝트 팀을 구성할 때였습니다. 팀원 모집 기간에 세림 님은 직접 개발한 자기소개 웹페이지로 연결되는 QR 코드를 명함처럼 만들어 동아리원들에게 나눠주었습니다. 자신을 알리는 창의적이고 적극적인 방식이 매우 인상 깊었습니다. 세림 님은 자신을 효과적으로 어필하는 방법을 알고 잘 활용합니다. 특히 세림 님은 자신의 경험을 기획과 개발에 녹여내는 능력이 탁월합니다. 이를 통해 사용자 관점에서 문제점을 깊이 있게 분석하고, 불편함을 효과적으로 해소하는 데 강점이 있습니다. 같이 팀으로 일해보고 싶은 인재입니다.',
    tags: ['creative', 'UX', 'execution'],
    consent: true,
  },

  // 🔽 여기에 새로운 추천사를 추가해주세요! 🔽
]
