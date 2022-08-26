class Sprite { 
    constructor({position, img}) { 
        this.position = position
        this.HEIGHT = 150
        this.WIDTH = 50
        this.image = new Image()
        this.image.src = img
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
        
    }

    update() {
        this.draw() 
    }

}

class fighter { 
    constructor({position, velocity,color, offset}) { 
        this.position = position
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
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.WIDTH, this.HEIGHT)
        

        if (this.isAttacking) {
        c.fillStyle = "yellow"
        c.fillRect(this.attackArea.position.x, this.attackArea.position.y, this.attackArea.width, this.attackArea.height)
        }
    }

    update() {

        this.draw()

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