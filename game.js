let finished = false
let mouseIsClicked = false
let frameCounter = 0
let fs


function setup() {
    createCanvas(800, 300)
    rectMode(CENTER)
    textAlign(CENTER)
    textStyle(ITALIC)
    diffOptionsMaker()
    setCastles()
    setTowers()
}

function draw() {
    background(50, 150, 200)
    diffStage()
    gameStage()
    endGameStage()
    mouseIsClicked = false
    frameCounter++
}


//everything resets on each stage.
function reset() {
    myTowers = []
    enemyTowers = []
    myUnits = []
    enemyUnits = []
    leftCastle = null
    rightCastle = null
    finished = false
    coins = 400
    enemyCoins = 400
    income = 50
    maxIncome = 500
    setCastles()
    setTowers()
}

function mouseClicked() {
    mouseIsClicked = true
}

