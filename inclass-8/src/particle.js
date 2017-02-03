const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
	// IMPLEMENT ME
    canvas = canvas ? canvas : {width: 800, height: 800}
   
    position[0] += velocity[0] * delta + (1/2) * acceleration[0] * Math.pow(delta, 2)
    position[1] += velocity[1] * delta + (1/2) * acceleration[1] * Math.pow(delta, 2)
    velocity[0] += acceleration[0] * delta
    velocity[1] += acceleration[1] * delta
    position[0] %= canvas.width
    position[1] %= canvas.height
    position[0] = position[0] < 0 ? position[0] + canvas.width : position[0]
    position[1] = position[1] < 0 ? position[1] + canvas.height : position[1]
    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
