//this is from inclass-8/particle.js
const frameUpdate = (cb) => {
    const rAF = (time) => {
        requestAnimationFrame(rAF)
        const diff = ~~(time - (rAF.lastTime || 0)) // ~~ is like floor
        cb(diff)
        rAF.lastTime = time
    }
    rAF() // go!
}
const StatusEnum = {
    prestart: 1,
    start: 2,
    pause: 3,
    over: 4
}
const GameVars = (c, w, h) => {
    GameVars.w = w
    GameVars.h = h
    GameVars.rates = [0.8, 1, 1.5, 2]
    GameVars.speedBoxText = ["slow", "medium", "fast", "ludicrous"]
    GameVars.v = 1
    GameVars.ballMass = 8
    GameVars.settings = {position: [w/2 - 40, h/2 + 15], size: [80, 30]}
    GameVars.numBricksRows = 5
    GameVars.numBricksCols = 10
    GameVars.brickTopOffset = 20
    GameVars.brickLeftOffset = 20
    GameVars.brickWidth = (w - (GameVars.numBricksCols + 1) * 
                        GameVars.brickLeftOffset) / GameVars.numBricksCols
    GameVars.brickHeight = h * .25 / (GameVars.numBricksRows + 1)
    GameVars.paddleWidth = w / 10
    GameVars.paddleHeight = 6
    GameVars.paddlePosy = h - 40
    GameVars.numBalls = 2
    const ww = w / 5, hh = h / 20
    GameVars.resumeBox = {position: [w/2 - ww/2, h/2], size: [ww, hh]}
    GameVars.speedBox = {position: [w/2 - ww * 0.8/2, h/2 + 95], 
                        size: [ ww * 0.8, hh * 0.8]}
    GameVars.scorePerHit = 10
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
const pointInRect = (P, rect) => {
    return P[0] > rect.position[0] && P[0] < rect.position[0]+rect.size[0] 
        && P[1] < rect.position[1] + rect.size[1] && P[1] > rect.position[1]
}

const speedControl = () => {
    const rate = GameVars.rates[GameVars.v]
    //The ball should have an upward velocity initially
    return [random(2 * rate, 3 * rate, true), 
        random(-3 * rate, -2 * rate)]
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
        return {ifCollide: true, norm: [0, 
                dist[1] * outsideRect[1] < 0 ? -1 : 1], rect: rect}
    }
    if (outsideRect[1] < 0 && Math.abs(outsideRect[0]) < ball.mass) {
        return {ifCollide: true, norm: 
                [dist[0] * outsideRect[0] < 0 ? -1 : 1, 0], rect: rect}
    }
    const corner = mult(outsideRect, outsideRect) < Math.pow(ball.mass, 2)
    if (!corner) return {ifCollide: false, rect: rect}
    const mag = Math.sqrt(mult(outsideRect, outsideRect));
    const dir = [dist[0] < 0 ? -1 : 1, dist[1] < 0 ? -1 : 1]
    const norm = [dir[0] * outsideRect[0] / mag, dir[1] * outsideRect[1] / mag]
    return { ifCollide:true, norm: norm, rect: rect};
}

const displayText = (context, text, x, y, font, color) => {
    context.font = font
    context.fillStyle = color
    context.textAlign="center"
    context.fillText(text, x, y)
}

const textInBox = (context, x, y, ww, hh, text, color="#000000") => {
    context.beginPath();
    context.rect(x, y, ww, hh)
    context.lineWidth = 2
    context.strokeStyle = color
    context.stroke()
    context.closePath()
    displayText(context, text, x + ww/2, y + hh/2 + 5, '15pt Calibri', color)

}

const drawGameOverlay = (context, w, h, metrics, status, win=false) => {
    switch (status) {
    case StatusEnum.prestart:
        drawOverlay(context, w, h, () => {
                context.font = '40pt Calibri'
                context.lineWidth = 4
                context.strokeStyle = 'white'
                context.textAlign="center"
                context.strokeText('Click to start', w / 2, h/2)
        })
        break
    case StatusEnum.start:
        const {position, size} = GameVars.settings
        context.font = '40pt Calibri'
        context.lineWidth = 4
        context.strokeStyle = 'blue'
        context.textAlign="center"
        context.strokeText(`Score: ${metrics.bricksHits
             * GameVars.scorePerHit}`, w / 2, h/2)

        const x = position[0], y = position[1]
        const ww = size[0], hh = size[1]
        textInBox(context, x, y, ww, hh, "Settings")
        break
    case StatusEnum.pause:
        drawOverlay(context, w, h, () => {
            let {position, size} = GameVars.resumeBox
            textInBox(context, position[0], position[1], 
                    size[0], size[1], "Resume", "white")
            displayText(context, "Speed Control", w / 2, h/2 + 75, 
                                        '15pt Calibri', "white")
            position = GameVars.speedBox.position
            size = GameVars.speedBox.size
            textInBox(context, position[0], position[1], 
                    size[0], size[1], 
                    GameVars.speedBoxText[GameVars.v], "white")
        })
        break
    case StatusEnum.over:
        drawOverlay(context, w, h, () => {
            const {position, size} = GameVars.resumeBox
            textInBox(context, position[0], position[1], 
                    size[0], size[1], "Start Again", "white")
            let ww = w / 2
            let hh = h / 2 + 75
            const stats = metricsForPlayer(metrics)
            Object.keys(stats).forEach((k, i) => {
                displayText(context, `${k}: ${stats[k]}`, ww, hh + 40 * i, 
                                        '15pt Calibri', "white")
            })
            if (win) {
                displayText(context, `Congratulations! You WIN!!!!`, 
                ww, h / 2 - 150, '30pt Calibri', "white")
            }
        })
    }
    
}


const drawOverlay = (context, w, h, custom) => {
    context.fillStyle = 'rgba(51, 51, 51, 0.9)';
    context.fillRect(0, 0, w, h)
    custom(context)
}

const getMousePos = (canvas, event) => {
    var rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left,
            event.clientY - rect.top]
}

const newBall = ({
    position=[0, 0],
    velocity= speedControl(),
    mass = GameVars.ballMass
} = {}) => {
    return {position, velocity, mass}
}

const newPaddle = ({
        position= [GameVars.w / 2, GameVars.paddlePosy],
        size = [GameVars.paddleWidth, GameVars.paddleHeight],
        onCollide = (ball, norm) => {
            metrics = updateMetrics(metrics, 
                {numPaddleHits: metrics.numPaddleHits + 1})
            return bounce(ball, norm)
        }
    } = {}) => {
        return {position, size, onCollide}
}

 const newBrick = ({
        position=[0, 0],
        size=[GameVars.brickWidth, GameVars.brickHeight],
        onCollide=bounce
    } = {}) => {
        return {position, size, onCollide}
}

const updateMetrics = (oldMetrics, updates) => {
    const newMetrics = JSON.parse(JSON.stringify(oldMetrics))
    Object.keys(updates).forEach((k) => newMetrics[k] = updates[k])
    return newMetrics
}

const metricsForPlayer = ({bricksHits, numDirectionChanges, 
            avgLocation, numPaddleHits, beginTime, endTime}) => {
    const player = {}
    const score = bricksHits * GameVars.scorePerHit
    const hist = localStorage.getItem("hist")
    const duration = endTime - beginTime
    let highScore = score
    if (hist) {
        const {highest} = JSON.parse(hist)
        highScore = Math.max(parseInt(highest), highScore)
    }
    localStorage.setItem("hist", JSON.stringify({highest: highScore}))

    return {
        "Highest Score": highScore,
        "Current Score": score,
        "Number of Direction Changes": numDirectionChanges,
        "Number of Paddle Hits": numPaddleHits,
        "Number of Bricks Eliminated Per Paddle Hit":
                                     bricksHits / numPaddleHits,
        "Time duration (seconds)": Math.floor(duration / 1000),
    }

}

const newMetrics = ({
    bricksHits=0, 
    numDirectionChanges=1,
    //start with two balls
    numPaddleHits=2, 
    beginTime=0, 
    endTime=0
} = {}) => {
    return {bricksHits, numDirectionChanges, numPaddleHits, beginTime, endTime}
}

const restrictInCanvas = (x) => {
        rightMost = GameVars.w - GameVars.paddleWidth
        return newPaddle({position: [x < rightMost ? 
                            x : rightMost, GameVars.paddlePosy]})
}


window.onload = () => {
    const test = localStorage.getItem("username")
    const canvas = document.getElementById('app')
    canvas.width = Math.min(window.innerHeight * 2/3, window.innerWidth);
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d")
    const w = canvas.width, h = canvas.height
    let status = StatusEnum.prestart
    GameVars(c, w, h)
    window.metrics = newMetrics()
    let paddle = newPaddle()
    let paddleToLeft = true
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect()
        const p = restrictInCanvas(getMousePos(canvas, e)[0])
        if (status === StatusEnum.start && 
                (p.position[0] < paddle.position[0]) !== paddleToLeft) {
            paddleToLeft = !paddleToLeft
            metrics = updateMetrics(metrics,{"numDirectionChanges": 
                            metrics.numDirectionChanges + 1})
        }
        paddle = p
    }, false)

    canvas.addEventListener('click', (e) => {

        const mouse = getMousePos(canvas, e)
        switch (status) {
        case StatusEnum.prestart:
            initGame()
            break
        case StatusEnum.start:
            status = pointInRect(mouse, GameVars.settings) ? 
                            StatusEnum.pause : status
            break
        case StatusEnum.pause:
            status = pointInRect(mouse, GameVars.resumeBox) ?
                            StatusEnum.start : status
            if (pointInRect(mouse, GameVars.speedBox)) {
                const oldrate = GameVars.rates[GameVars.v]
                GameVars.v = (GameVars.v + 1) % GameVars.rates.length
                const newrate = GameVars.rates[GameVars.v]
                balls = balls.map((b) => newBall({position: b.position,
                                velocity: scale(b.velocity, newrate/oldrate)}))
            }
            break
        case StatusEnum.over:
            if (pointInRect(mouse, GameVars.resumeBox)) {
                initGame()
            }
            break;
        default:
            alert("debug: wrong status code")
        }
     
      
    }, false)

    const wall = {position: [0, 0], size: [w, h], 
        onCollide: (ball, norm) => {
        if (status !== StatusEnum.start) return ball
        if (norm[0] === 0 && norm[1] === -1) {
            status = StatusEnum.over
            metrics = updateMetrics(metrics, {endTime: Date.now()})
            return ball
        }else {
            return bounce(ball, norm)
        }
    }}
    
    let bricks = []
    let balls = Array(GameVars.numBalls).fill(0).map((_) => newBall())
    let win = false
    const initGame = () => {
        bricks = Array(GameVars.numBricksRows).fill(0).reduce((pre, row, i) => {
                return pre.concat(Array(GameVars.numBricksCols).fill(0)
                        .map((col, j) => {
                    return newBrick({position: 
                        [j * (GameVars.brickWidth + 
                        GameVars.brickLeftOffset) + GameVars.brickLeftOffset, 
                        i * (GameVars.brickHeight + GameVars.brickTopOffset) 
                                                + GameVars.brickTopOffset]})
                    }))
            }, [])
            paddle = newPaddle()
            status = StatusEnum.start
            balls = balls.map((b) => newBall({position: b.position}))
            metrics = updateMetrics(newMetrics(), {beginTime: Date.now()})
            win = false
    }

    frameUpdate((dt) => {
        c.clearRect(0, 0, w, h);
        const updateBall = ((ball, i) => {

            switch (status) {
            case StatusEnum.pause:
                return ball
            case StatusEnum.start:
                const pos = add(ball.position, ball.velocity)
                const b = newBall({position: pos, velocity: ball.velocity})
                const remainingBricks = bricks.map((br) => ifCollide(b, br))
                                    .filter((collision) =>!collision.ifCollide)
                                    .map((collision) => collision.rect)
                metrics = remainingBricks.length === bricks.length ? 
                                 metrics : updateMetrics(metrics, 
                                        {bricksHits: metrics.bricksHits + 1})
                const solids = [paddle, wall].concat(bricks)
                const collision = solids.map((item) => ifCollide(b, item))
                    .find((collision) => collision.ifCollide)
                bricks = remainingBricks 
                if (bricks.length === 0) {
                    status = StatusEnum.over
                    win = true
                }     
                return collision ? 
                        collision.rect.onCollide(b, collision.norm) : b
            case StatusEnum.prestart:
            case StatusEnum.over:
                return newBall({position: add(paddle.position,
                                        [i* GameVars.paddleWidth, -10]), 
                                velocity: ball.velocity})
            default:
                alert("Debug: Wrong Status code!")
            }
        })

        balls = balls.map((b, i) => updateBall(b, i))
        bricks.forEach((brick) => {
            c.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16)
            c.fillRect(brick.position[0], brick.position[1], 
                        brick.size[0], brick.size[1]);
        })
        c.fillStyle = 'blue'
        c.fillRect(paddle.position[0], paddle.position[1], 
                                paddle.size[0], paddle.size[1]);
        balls.forEach((b) => {
            c.fillStyle = 'pink'
            c.beginPath()
            c.arc(b.position[0], b.position[1], b.mass, 0, 2 * Math.PI)
            c.fill()
        })
        
        drawGameOverlay(c, w, h, metrics, status, win)
        

    })
}


