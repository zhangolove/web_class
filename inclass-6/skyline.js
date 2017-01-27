'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

    var buildings = []

    
    canvas.addEventListener("click", function (e) {
        const clickX = event.layerX - canvas.offsetLeft
        const clickY = event.layerY - canvas.offsetTop
       
        const needGrow = buildings.filter((blg) => (clickY > blg.top
                                     && clickY < blg.top + blg.height 
                                    && clickX > blg.left 
                                    && clickX < blg.left + blg.width))
        
        needGrow.forEach(function(blg) {
            const increment = floorSpacing + windowHeight
            blg.height += increment
            blg.top -= increment
            c.fillStyle = blg.color
            c.fillRect(blg.left, blg.top, blg.width, increment)
            for (var y = blg.top; y >= blg.top; y -= floorSpacing + windowHeight) {
                for (var x = windowSpacing; x < blg.width - windowWidth; x += windowSpacing + windowWidth) {
                    c.fillStyle = Math.random() < 0.3 ? "black" : "yellow"
                    c.fillRect(blg.left + x, y , windowWidth, windowHeight)
                }
		    }
        })             
    })


    //draw sun and car
    const sunPos = {x: 20, y: 90}
    const carPos = {x: 0, y: floor - 30}

    function redraw() {
        c.clearRect(0, 0, canvas.width, floor);

        //draw sun with smallest z index since it's in the background
        c.beginPath()
        c.arc(sunPos.x, sunPos.y, 20, 0, 2 * Math.PI,false)
        c.fillStyle='gold'
        c.fill()


        //draw buildings


        buildings.forEach(function(blg) {
            c.fillStyle = blg.color
            c.fillRect(blg.left, floor - blg.height, blg.width, blg.height)
            for (var y = floor - floorSpacing; y > floor - blg.height; y -= floorSpacing + windowHeight) {
                for (var x = windowSpacing; x < blg.width - windowWidth; x += windowSpacing + windowWidth) {
                    c.fillStyle = Math.random() < 0.3 ? "black" : "yellow"
                    c.fillRect(blg.left + x, y - windowHeight, windowWidth, windowHeight)
                }
            }
        })

        

        //car should be in the foreground
        c.fillStyle = 'blue'
        c.fillRect(carPos.x, carPos.y,50,25)
        c.beginPath()
        c.arc(carPos.x + 10, floor - 5 , 5, 0, 2 * Math.PI, true)
        c.arc(carPos.x + 35, floor - 5 , 5, 0, 2 * Math.PI, true)
        c.fillStyle = "gray"
        c.fill()


    }
    

    //animation
    setInterval(function() {

        carPos.x = (carPos.x + 2) % canvas.width
	    sunPos.x = (sunPos.x + 2) % canvas.width

        redraw()

	    
	}, 16)


    

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
        
		const bgColor= blgColors[ Math.floor(Math.random()*blgColors.length)]
        
        buildings.push({left: x0, top: floor - blgHeight, width: blgWidth, height: blgHeight, color:bgColor})
	
		

        
	}

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}

