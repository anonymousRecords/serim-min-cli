type SpeedParams = {
  base: number
  max: number
  stepEvery: number
  stepAmount: number
}

const DEFAULT_SPEED_PARAMS: SpeedParams = {
  base: 1.0,
  max: 5.0,
  stepEvery: 80,
  stepAmount: 0.1,
}

function shouldIncreaseSpeed(
  score: number,
  params: SpeedParams = DEFAULT_SPEED_PARAMS
) {
  return score > 0 && score % params.stepEvery === 0
}

function nextSpeed(
  score: number,
  speed: number,
  params: SpeedParams = DEFAULT_SPEED_PARAMS
) {
  if (shouldIncreaseSpeed(score, params)) {
    return Math.min(params.max, speed + params.stepAmount)
  }
  return speed
}

export function stepScoreAndSpeed(
  score: number,
  speed: number,
  params: SpeedParams = DEFAULT_SPEED_PARAMS
) {
  const nextScore = score + 1
  const next = nextSpeed(nextScore, speed, params)
  return { score: nextScore, speed: next }
}
