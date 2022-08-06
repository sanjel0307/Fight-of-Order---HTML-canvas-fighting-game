const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280 
canvas.height = 720 

c.fillRect(0, 0, canvas.width, canvas.height)
const GRAVITY = 0.8

class Sprite { 
    constructor({position, velocity}) { 
        this.position = position
        this.velocity = velocity
        this.HEIGHT = 150
        this.WIDTH = 50
        this.lastKey // used to find out the last key used for fluid movement mechanics
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.WIDTH, this.HEIGHT)
    }

    update() {
        this.draw()
        
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y
        
        if (this.position.y + this.HEIGHT + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += GRAVITY
        }
    }
}

const player = new Sprite({
    position: {
        x:0,
        y:0
    },
    velocity: {
        x:0,
        y:0
    }
})

const enemy = new Sprite({
    position: {
        x:200,
        y:0
    },
    velocity: {
        x:0,
        y:0
    }
})



const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

 




function gameLoop() { 
    window.requestAnimationFrame(gameLoop)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // clear the canvas every loop frame 
    player.update()
    enemy.update()

    //Player Movement
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey == 'a') {
        player.velocity.x = -1 
    } else if (keys.d.pressed && player.lastKey == 'd') {
        player.velocity.x = 1
    }

    //Enemy Movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft') {
        enemy.velocity.x = -1 
    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
        enemy.velocity.x = 1
    }
}

gameLoop() //creates an infinite loop of each animation frame 

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd': //right P1
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a': // left P1
            keys.a.pressed = true 
            player.lastKey = 'a'
            break
        case 'w': // jump P1
            player.velocity.y = -18
            break
        case 'ArrowRight': // right P2 
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft': // left P2 
            keys.ArrowLeft.pressed = true 
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp': // jump P2
            enemy.velocity.y = -18
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd': // right P1 release
            keys.d.pressed = false
            break
        case 'a': // left P1 release
            keys.a.pressed = false
            break
        case 'w': // jump P1 release
            keys.w.pressed = false
            break
        case 'ArrowRight': // right P2 release
             keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft': // left P2 release
            keys.ArrowLeft.pressed = false 
            break
        case 'ArrowUp': // jump P2 release
            keys.ArrowUp.pressed = false
            break
    }
})