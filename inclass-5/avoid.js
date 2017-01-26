window.onload = function() {
    console.log("hello")
    btn = document.getElementById("clickBtn")
    const box = document.getElementById("box")
    btn.addEventListener('mousemove', function(e) {
       
        if (!window.event.shiftKey & btn.innerHTML === "Click Me") {
            w = (e.screenX + Math.random() * window.innerWidth) % window.innerWidth
            h = (e.screenY + Math.random() * window.innerHeight)% window.innerHeight
            console.log(h)
            box.style.left = w + 'px';
            box.style.top = h + 'px';
        } 
    });
    // elem.addEventListener('click', function() {
    //     if (elem.firstElementChild.innerHTML === "Click Me!") {
    //         elem.firstElementChild.innerHTML = "Play Again";
    //     } else {
    //         elem.firstElementChild.innerHTML = "Click Me!";
    //     }
    // });
}