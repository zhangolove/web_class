const frameUpdate = (cb) => {
    const rAF = (time) => {
        requestAnimationFrame(rAF)
        const diff = ~~(time - (rAF.lastTime || 0)) // ~~ is like floor
        cb(diff)
        rAF.lastTime = time
    }
    rAF() // go!
}

const random = (min=0, max=800, signed=false) => {
    let sign = 1
    if (signed) {
        sign = Math.random() < 0.5 ? 1 : -1;
    }
    return sign * (Math.random() * (max - min) + min)
}
const add = ([v1x, v1y], [v2x, v2y]) => [v1x + v2x, v1y + v2y]
const mult = ([v1x, v1y], [v2x, v2y]) => v1x * v2x + v1y * v2y
const scale = ([vx, vy], a) => [vx * a, vy * a] 
const abs = ([vx, vy]) => [Math.abs(vx), Math.abs(vy)] 
const vec = (A, B) => add(B, scale(A, -1))

const ballMass = 8
const newBall = ({
    position=[0, 0],
    velocity= [random(2, 3, true), random(-3, -2)],
    mass = ballMass
} = {}) => {
    return {position, velocity, mass}
}


const bounce = (ball, surfaceNorm) => {
    const v = add(ball.velocity, 
                scale(surfaceNorm,
                -2 * mult(ball.velocity, surfaceNorm)))
    return newBall({position: add(ball.position, v), velocity: v})
}

const ifCollide = (ball, rect) => {
    const rectCenter = add(rect.position, scale(rect.size, 0.5))
    const dist = vec(rectCenter, ball.position)
    const outsideRect = add(abs(dist), scale(rect.size, -0.5))
    if (outsideRect[0] > ball.mass || outsideRect[1] > ball.mass) {
        return {ifCollide: false, rect: rect}
    } else if (outsideRect[0] < -ball.mass && outsideRect[1] < -ball.mass) {
        return {ifCollide: false, rect: rect}
    }
    if (outsideRect[0] < 0 && Math.abs(outsideRect[1]) < ball.mass) {
        return {ifCollide: true, norm: [0, dist[1] * outsideRect[1] < 0 ? -1 : 1], rect: rect}
    }
    if (outsideRect[1] < 0 && Math.abs(outsideRect[0]) < ball.mass) {
        return {ifCollide: true, norm: [dist[0] * outsideRect[0] < 0 ? -1 : 1, 0], rect: rect}
    }
    const corner = mult(outsideRect, outsideRect) < Math.pow(ball.mass, 2)
    if (!corner) return {ifCollide: false, rect: rect}
    const mag = Math.sqrt(mult(outsideRect, outsideRect));
    const dir = [dist[0] < 0 ? -1 : 1, dist[1] < 0 ? -1 : 1]
    const norm = [dir[0] * outsideRect[0] / mag, dir[1] * outsideRect[1] / mag]
    return { ifCollide:true, norm: norm, rect: rect};
}
    


window.onload = () => {
    const canvas = document.getElementById('app')
    const c = canvas.getContext("2d")
    const w = canvas.width
    const h = canvas.height
    const numBricksRows = 5
    const numBricksCols = 10
    const brickTopOffset = 20
    const brickLeftOffset = 20
    const brickWidth = (w - (numBricksCols + 1) * 
                        brickLeftOffset) / numBricksCols
    const brickHeight = 30
    const paddleWidth = w / 10
    const paddleHeight = 20
    const paddlePosy = h - 40
    const numBalls = 1
    const defaultSpeed = 1
    const wall = {position: [0, 0], size: [w, h], 
                  onCollide: (ball, norm) => {
                    if (norm[0] === 0 && norm[1] === -1) {
                        gameStart = false
                        return ball
                    }else {
                        return bounce(ball, norm)
                    }
                  }}
    

    let gameStart = false
    canvas.addEventListener('click', (e) => {
      gameStart = true
    }, false)


    const newPaddle = ({
        position= [w / 2, paddlePosy],
        size = [paddleWidth, paddleHeight],
        onCollide = bounce
    } = {}) => {
        return {position, size, onCollide}
    }

    const restrictInCanvas = (x) => {
        rightMost = w - paddleWidth
        return newPaddle({position: [x < rightMost ? x : rightMost, paddlePosy]})
    }
    let paddle = newPaddle()
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect()
        paddle = restrictInCanvas(e.clientX - rect.left)
    }, false)


    const newBrick = ({
        position=[0, 0],
        size=[brickWidth, brickHeight],
        onCollide=bounce
    } = {}) => {
        return {position, size, onCollide}
    }

    let bricks = Array(numBricksRows).fill(0).reduce((pre, row, i) => {
        return pre.concat(Array(numBricksCols).fill(0).map((col, j) => {
                return newBrick({position: 
                        [j * (brickWidth + brickLeftOffset) + brickLeftOffset, 
                        i * (brickHeight + brickTopOffset) + brickTopOffset]})
            }))
    }, [])

   
    let balls = Array(numBalls).fill(0).map((_) => newBall())
    

    frameUpdate((dt) => {
        c.clearRect(0, 0, w, h);
        bricks.forEach((brick) => {
            c.fillStyle = 'red'
            c.fillRect(brick.position[0], brick.position[1], 
                        brickWidth, brickHeight);
        })
        c.fillStyle = 'blue'
        c.fillRect(paddle.position[0], paddle.position[1], 
                                paddleWidth, paddleHeight);


        const updateBall = ((ball, i) => {
            //console.log(ball.position)
                                   
            if (gameStart) {
                const pos = add(ball.position, ball.velocity)
                const b = newBall({position: pos, velocity: ball.velocity})

                
                const remainingBlocks = bricks.map((br) => ifCollide(b, br))
                                      .filter((collision) => !collision.ifCollide)
                                      .map((collision) => collision.rect)
                const solids = [paddle, wall].concat(bricks)
                const collision = solids.map((item) => ifCollide(b, item))
                     .find((collision) => collision.ifCollide)
               
                bricks = remainingBlocks                
                return collision ? collision.rect.onCollide(b, collision.norm) : b
            }else {
                return newBall({position: add(paddle.position,[i*paddleWidth, -10]), 
                                velocity: ball.velocity})
            }
        })

        balls = balls.map((b, i) => updateBall(b, i))

        balls.forEach((b) => {
            c.fillStyle = 'pink'
            c.beginPath()
            c.arc(b.position[0], b.position[1], ballMass, 0, 2 * Math.PI)
            c.fill()
        })

        

    })
}


