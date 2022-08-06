const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280 
canvas.height = 720 

c.fillRect(0, 0, canvas.width, canvas.height)
const GRAVITY = 0.2 

class Sprite { 
    constructor({position, velocity}) { 
        this.position = position
        this.velocity = velocity
        this.HEIGHT = 150
        this.WIDTH = 50
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.WIDTH, this.HEIGHT)
    }

    update() {
        this.draw()
        
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




function gameLoop() { 
    window.requestAnimationFrame(gameLoop)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // clear the canvas every loop frame 
    player.update()
    enemy.update()
}

gameLoop() //creates an infinite loop of each animation frame 

