class Sprite { 
    constructor({position, img, scale = 1, maxFrames = 1, offset = {x:0, y:0}}) { 
        this.position = position
        this.HEIGHT = 150
        this.WIDTH = 50
        this.image = new Image()
        this.image.src = img
        this.scale = scale
        this.maxFrames = maxFrames
        this.currentFrame = 0
        this.frameCount = 0 
        this.frameHold = 10
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image, 
            this.currentFrame * (this.image.width / this.maxFrames), 
            0, 
            this.image.width / this.maxFrames, 
            this.image.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.maxFrames) * this.scale, 
            this.image.height * this.scale)

    }

    animateFrame() {  
        this.frameCount++

        if (this.frameCount % this.frameHold === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame ++
            }
            else {
                this.currentFrame = 0
            }
        }
    }

    update() {
        this.draw() 
        this.animateFrame()
    }

}

class fighter extends Sprite { 
    constructor({position, velocity,color,  img, scale = 1, maxFrames = 1, offset = {x:0, y:0}, sprites}) {
        super({img, scale, maxFrames, position, offset}) 
        this.velocity = velocity
        this.HEIGHT = 150
        this.WIDTH = 50
        this.color = color;
        this.lastKey // used to find out the last key used for fluid movement mechanics
        this.health = 100
        this.attackArea = { 
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 80,
            height: 50
        }
        this.isAttacking
        this.currentFrame = 0
        this.frameCount = 0 
        this.frameHold = 15
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].img
        }
        console.log(this.sprites)
    }

    

    update() {

        this.draw()
        this.animateFrame()

        this.attackArea.position.x = this.position.x + this.attackArea.offset.x
        this.attackArea.position.y = this.position.y
        
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y
        
        if (this.position.y + this.HEIGHT + this.velocity.y >= canvas.height - HEIGHT_OFFSET) {
            this.velocity.y = 0
        } else {
            this.velocity.y += GRAVITY
        }
    }

    attack () {
        this.isAttacking = true 
        setTimeout(() => {
            this.isAttacking = false
        }, 300)
    }
}