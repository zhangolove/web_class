const add = ([v1x, v1y], [v2x, v2y]) => [v1x + v2x, v1y + v2y]
const mult = ([v1x, v1y], [v2x, v2y]) => v1x * v2x + v1y * v2y
const scale = ([vx, vy], a) => [vx * a, vy * a] 
const abs = ([vx, vy]) => [Math.abs(vx), Math.abs(vy)] 
const vec = (A, B) => add(B, scale(A, -1))

const ifCollide = (ball, rect) => {
    const rectCenter = add(rect.position, scale(rect.size, 0.5))
    console.log(`rectCenter: ${rectCenter}`)
    const dist = vec(rectCenter, ball.position)
    console.log(`dist ${dist}`)
    const outsideRect = add(abs(dist), scale(rect.size, -0.5))
    console.log(`outsideRect ${outsideRect}`)
    if (outsideRect[0] > ball.mass || outsideRect[1] > ball.mass) {
        return {ifCollide: false}
    } else if (outsideRect[0] < -ball.mass && outsideRect[1] < -ball.mass) {
        return {ifCollide: false}
    }
    if (outsideRect[0] < 0 && Math.abs(outsideRect[1]) < ball.mass) {
        return {ifCollide: true, norm: [0, dist[1] * outsideRect[1] < 0 ? -1 : 1]}
    }
    if (outsideRect[1] < 0 && Math.abs(outsideRect[0]) < ball.mass) {
        return {ifCollide: true, norm: [dist[0] * outsideRect[0] < 0 ? -1 : 1, 0]}
    }
}


const ballMass = 8
const newBall = ({
    position=[0, 0],
    velocity= [1, 1],
    mass = ballMass
} = {}) => {
    return {position, velocity, mass}
}


window.onload = () => {
    console.log('hello')
    const wall = {position: [0, 0], size:[100, 100]}
    const ball = newBall({position: [94,40]})
    console.log(ball.velocity)
    // const ballsPos = [[794, 300], [799, 300], [3, 300], [-4, 300], 
    //                   [500, 3], [500, -4], [8, 300]]
    // const collision = ifCollide(ball, wall)
    // console.log(collision)
}