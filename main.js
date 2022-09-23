const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280 
canvas.height = 720 

c.fillRect(0, 0, canvas.width, canvas.height)
const GRAVITY = 0.8

const background = new Sprite({position: {x: 0, y: 0}, img: "assets/background.png"})

const player = new fighter({
    position: {
        x:0,
        y:0
    },
    velocity: {
        x:0,
        y:0
    },
    color: "blue",
    offset: {
        x: 0,
        y: 0
    },
    img: "./assets/Skeleton/idle.png",
    maxFrames: 4,
    scale: 2,
    offset: {
        x: 100,
        y: 125
    },
    sprites: {
        idle: {
            img:"./assets/Skeleton/idle.png",
            maxFrames: 4
        },

        walk: {
            img:"./assets/Skeleton/walk.png",
            maxFrames: 4
        }
    }
})

const enemy = new fighter({
    position: {
        x:200,
        y:0
    },
    velocity: {
        x:0,
        y:0
    },
    color: "red",
    offset: {
        x: -30,
        y: 0
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

decrementTimer()

function gameLoop() { 
    window.requestAnimationFrame(gameLoop)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // clear the canvas every loop frame 
    background.update()
    player.update()
    //enemy.update()

    //Player Movement
    player.velocity.x = 0

    player.image = player.sprites.idle.image
    if (keys.a.pressed && player.lastKey == 'a' && player.position.x > 0) {
        player.velocity.x = -1
        player.image = player.sprites.walk.image

    } else if (keys.d.pressed && player.lastKey == 'd' && player.position.x + player.WIDTH < canvas.width)  {
        player.velocity.x = 1
        player.image = player.sprites.walk.image
    }

    //Enemy Movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft' && enemy.position.x > 0) {
        enemy.velocity.x = -1 

    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight' && enemy.position.x + enemy.WIDTH < canvas.width) {
        enemy.velocity.x = 1
    }

    //Collision Detection for enemy
    if (hitBoxCollision({box1: player, box2: enemy}) && player.isAttacking) {
        enemy.health -= 10
        document.querySelector("#enemyHealth").style.width = enemy.health + "%"
        player.isAttacking = false
    }

    //Collision Detection for player
    if (hitBoxCollision({box1: enemy, box2: player}) && enemy.isAttacking) {
        console.log("HIT - player");
        player.health -= 10
        document.querySelector("#playerHealth").style.width = player.health + "%"
        enemy.isAttacking = false
    }

    //game over:
    if (enemy.health <= 0 || player.health <= 0) {
        whoWins({player, enemy, timerID})

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
            if (player.velocity.y === 0) { // prevent player from spamming Jump
                player.velocity.y = -18
                break
            }
        case 'ArrowRight': // right P2 
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft': // left P2 
            keys.ArrowLeft.pressed = true 
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp': // jump P2
            if (enemy.velocity.y === 0) {
            enemy.velocity.y = -18
            break}
        case ' ':
            player.attack()
            break
        case 'l':
            enemy.attack()
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