HEIGHT_OFFSET = 150

function hitBoxCollision({box1, box2}) {
    return (
    box1.attackArea.position.x  + box1.attackArea.width  >= box2.position.x
    && box1.attackArea.position.x  <= box2.position.x + box2.WIDTH
    && box1.attackArea.position.y + box1.attackArea.height >= enemy.position.y
    && box1.attackArea.position.y <= box2.position.y + box2.HEIGHT
           )
    
}

function whoWins({player, enemy, timerID}) {
    clearTimeout(timerID)
    document.querySelector("#displayText").style.display = "flex"
    if (player.health > enemy.health) {
        console.log("Player 1 WINS")
        document.querySelector("#displayText").innerHTML = "PLAYER 1 WINS"
        
    }
    if (enemy.health > player.health) {
        console.log("Player 2 WINS")
        document.querySelector("#displayText").innerHTML = "PLAYER 2 WINS"
    }
    if (enemy.health == player.health) {
        document.querySelector("#displayText").innerHTML = "TIE"
    }
}


let timer = 60
let timerID 
function decrementTimer() {
    if (timer > 0) {
        timerID = setTimeout(decrementTimer, 1000)
        timer--
        document.querySelector("#clockTimer").innerHTML = timer
    }

    if (timer === 0) {
        whoWins({player, enemy})
    }
}
