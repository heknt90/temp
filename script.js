let dogs = Array.from(document.querySelectorAll('[data-mailiq-animation="dog"]'));
console.log(dogs)


const dogListener = window.addEventListener('scroll', dogScrollHandler)

function dogScrollHandler() {
    for (let dog of dogs) {
        if (pageYOffset + document.documentElement.clientHeight / 2 > dog.offsetTop + dog.offsetHeight / 2) {
            dogs = dogs.filter(dogF => dogF !== dog)
            dog.classList.add('animation-greetings')
            cover(dog)
        }
    }
}

function cover(elem) {
    elem.style.opacity = '0';
    const drawer = document.createElement('div')
    const close = document.createElement('span')
    close.innerText = 'Закрыть'
    close.style.position = 'absolute'
    close.style.right = '20px'
    close.style.top = '20px'
    close.style.color = 'white'
    drawer.append(close)
    drawer.style.top = '0'
    drawer.style.left = '0'
    drawer.style.right = '0'
    drawer.style.bottom = '0'
    drawer.style.backgroundColor = 'rgba(0,0,0,.7)'
    const clone = elem.cloneNode(true)
    clone.style.position = drawer.style.position ='fixed'
    clone.style.transition = drawer.style.transition = "opacity 0.4s"
    clone.style.top = document.documentElement.clientHeight / 2  - elem.offsetHeight / 2 + 'px';
    clone.style.left = document.documentElement.clientWidth / 2  - elem.offsetWidth / 2 + 'px';
    clone.style.opacity = '1'
    clone.setAttribute('id', 'dog-clone')
    
    document.documentElement.append(drawer)
    document.documentElement.append(clone)

    drawer.addEventListener('click', closeDogDialog)
}

function closeDogDialog() {
    // console.log(0)
    const clone = document.querySelector('#dog-clone')
    const dogs = document.querySelectorAll('[data-mailiq-animation="dog"]')
    dogs.forEach(dog => {
        if (dog.style.opacity === '0') {
            dog.style.opacity = '1';
            this.style.opacity = '0';
            clone.style.opacity = '0'
            setTimeout(()=> {
                clone.remove();
                this.remove()
            }, 500)
        }
    })
}


const buttons = Array.from(document.querySelectorAll('[data-mailiq-animation="fireworks"]'))
console.log(buttons)

for (button of buttons) {
    button.addEventListener('click', () => {
        const canvasWidth = 400;
        const canvasHeight = 400;
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', canvasWidth)
        canvas.setAttribute('height', canvasHeight)
        // canvas.style.width = canvasWidth + 'px'
        canvas.style.position = 'absolute'
        canvas.style.left = '50%'
        canvas.style.top = '50%'
        canvas.style.transform = 'translate(-50%, -50%)'
        button.style.position = 'relative'
        // canvas.style.border = '1px solid black'

        button.append(canvas)

        const colors = ['224,201,59', '57,189,197', '64,230,79', '245,143,57', '255,75,71']

        const particles = [
            { r: 4, dx:  2, dy: -4, colorString: colors[1] },
            { r: 5, dx: -3, dy: -2, colorString: colors[3] },
            { r: 2, dx:  2, dy: -3, colorString: colors[4] },
            { r: 1, dx:  1, dy: -2, colorString: colors[1] },
            { r: 6, dx: -3, dy: -4, colorString: colors[0] },
            { r: 4, dx:  4, dy: -3, colorString: colors[2] },
            { r: 7, dx:  -2, dy: -3, colorString: colors[2] },
            { r: 6, dx:  1, dy: -3, colorString: colors[4] },
        ]

        const context = canvas.getContext("2d");        
        const startX = canvasWidth / 2
        const startY = canvasHeight / 2 + 10
        let opacity = .8
        let dOpacity = 0.06
        let animationId;
        let isChanged = false 
        
        function draw(){
            context.clearRect(0,0, 1000, 1000);
            
            for (let p of particles) {
                if (!p.x && !p.y) {
                    p.x = startX
                    p.y = startY
                }
                context.beginPath();
                context.fillStyle = `rgba(${p.colorString},${opacity})`;
                context.arc(p.x, p.y, p.r, 0, getRadians(360))
                context.fill();
                context.closePath()
                p.x += p.dx;
                if (p.y < 120) {
                    p.dy = -p.dy
                }
                p.y += p.dy
            }
            // console.log(opacity, dOpacity, opacity + dOpacity)
            opacity += dOpacity
            if (!isChanged && !isFalling()) {
                console.log('change dir')
                dOpacity = -.01
                isChanged = true
            }
            if (opacity > 1 ) opacity = 1
            if (opacity < 0) {
                cancelAnimationFrame(animationId)
                canvas.remove()
                return
            }
            animationId = window.requestAnimationFrame(draw);
        }
        draw();
            

        function getRadians(degrees) {
            return (Math.PI / 180) * degrees;
        }

        function isFalling() {
            for (let p of particles) {
                if (p.dy > 0) return true
            }
            return false
        }
    })
}