export function applyPhysics(
  catY: number,
  velY: number,
  grounded: boolean,
  params: { GRAVITY: number; MAX_JUMP: number; EPS: number }
): { catY: number; velY: number; grounded: boolean } {
  const { GRAVITY, MAX_JUMP, EPS } = params
  velY += GRAVITY
  catY += velY * 0.9
  if (catY > MAX_JUMP) {
    catY = MAX_JUMP
    if (velY > 0) velY = 0
  }
  if (catY <= EPS && velY <= 0) {
    catY = 0
    velY = 0
    grounded = true
  } else {
    grounded = false
  }
  return { catY, velY, grounded }
}

export function onJump(
  grounded: boolean,
  catY: number,
  velY: number,
  params: { JUMP_VEL: number; MAX_JUMP: number }
): { velY: number; grounded: boolean } {
  const { JUMP_VEL, MAX_JUMP } = params
  if (grounded) {
    return { velY: JUMP_VEL, grounded: false }
  } else if (catY < MAX_JUMP) {
    return { velY: velY + 0.4, grounded }
  }
  return { velY, grounded }
}
