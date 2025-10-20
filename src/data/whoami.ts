export type Choice = { title: string; value: 'A' | 'B' }

export type Answer = 'A' | 'B' | undefined

export type Q = {
  id: string
  message: string
  choices: [Choice, Choice]
  correct: 'A' | 'B'
  feedback: string
  note?: string
}

export const QUESTIONS: Q[] = [
  {
    id: 'q1',
    message: 'Q1. 민세림에게 개발에 있어서 중요한 가치는?',
    choices: [
      { title: 'A. 완벽한 구조와 깔끔한 코드', value: 'A' },
      {
        title: 'B. 사람들이 실제로 쓰고, 그들의 반응을 들을 수 있는 결과물',
        value: 'B',
      },
    ],
    correct: 'B',
    feedback: '세림은 코드보다는 프로덕트에 더 관심이 많아요.',
    note: '코드는 프로덕트를 위한 수단이라고 생각해요. 프로덕트를 만들고 사람들이 써보며 남기는 피드백을 듣는 순간이 제일 즐겁습니다.',
  },
  {
    id: 'q2',
    message: 'Q2. 민세림이 가장 즐거움을 느끼는 순간은?',
    choices: [
      { title: 'A. 반복 업무를 할 때', value: 'A' },
      {
        title: 'B. “이제 이건 내 것이구나”라는 감각을 느낄 때',
        value: 'B',
      },
    ],
    correct: 'B',
    feedback:
      '새로운 걸 시도하고, 스스로 해결해 자기 것으로 만드는 과정에 큰 즐거움을 느낍니다.',
    note: '무언가를 “아는 감각”을 좋아해요. 익숙한 것도 다시 시도해 능숙해지고, 전보다 나아진 자신을 확인할 때 희열을 느낍니다.',
  },
  {
    id: 'q3',
    message: 'Q3. 세림이 되고 싶은 동료는 어떤 사람일까?',
    choices: [
      { title: 'A. 계속 체크하고 세세히 피드백을 주는 동료', value: 'A' },
      { title: 'B. 조용하지만, 믿고 맡길 수 있는 동료', value: 'B' },
    ],
    correct: 'B',
    feedback: '동료에게 신뢰가 되는 사람이길 원해요.',
    note: '소용돌이치는 상황 속에서도, “이 사람이라면 그래도 믿을 수 있다”는 안심을 주는 존재로 여겨지길 원해요.',
  },
]
