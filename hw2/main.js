
window.onload = function() {
    
    const numImagePerSet = 5
    const images = document.getElementsByTagName('img')
    const imgUrls = Array.prototype.map.call(images, function(img, idx) {
        //this is to generate a list of 5 image urls for each img element
        const imageBaseUrl = "https://unsplash.it/300/300?image=" + idx
        return [1, 2, 3, 4, 5].map(function(i) {
            return imageBaseUrl + i
        })
    })

    function createButton(img){
        const button = document.createElement("BUTTON")
        img.parentNode.insertBefore(button, img.nextSibling)
        button.innerHTML = "Stop"
        return button
    }

   
    Array.prototype.forEach.call(images, function(img, idx) {
        const minInterval = 1000
        const maxInterval = 5000
        const imageUpdateRate = Math.random() * (maxInterval - 
                                minInterval + 1) + minInterval
        let nthInSet = 0
        const updateImgFunc = function() {
            return setInterval(function() {			
                        img.src = imgUrls[idx][nthInSet]
                        nthInSet = (nthInSet + 1) % 5	
                    }, imageUpdateRate)
        }
        let timer = updateImgFunc()
        const btn = createButton(img)
        btn.onclick = function () {
            if (!timer) {
                nthInSet = 0
                timer = updateImgFunc()
                btn.innerHTML = "Stop"
            }else {
                clearInterval(timer)
                timer = undefined
                btn.innerHTML = "Start"
            }
        }
    })
}