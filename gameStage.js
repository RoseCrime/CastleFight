const gameStage = () => {
    if (difficulty) {
        strokeWeight(3)
        
        leftCastle.refresh().healthDisplay()

        rightCastle.refresh().healthDisplay()

        unitRefresher()
        towerRefresher()
        setPanels()

        EnemyUnitMaker()

        if (mouseIsClicked) {
            if (mouseX > 30 &&
                mouseX < 205 &&
                mouseY > 230 &&
                mouseY < 270) {
                unitMaker(mouseX, mouseY)
            }
        }
        gainMoney()
    }
}

const setPanels = () => {
    //circlePanel
    textSize(12)
    stroke(0)
    fill(255, 100)
    rect(117.5, 250, 180, 50)

    fill(50, 100, 200)
    ellipse(50, 250, 40)
    text('tank', 50, 295)

    fill(0, 255, 0)
    ellipse(95, 250, 40)
    text('Damage', 95, 295)

    fill(255, 0, 0)
    ellipse(140, 250, 40)
    text('Range', 140, 295)

    fill(255, 215, 0)
    ellipse(185, 250, 40)
    text('Mix', 185, 295)
    textSize(20)
    if (coins >= 150) {
        fill(0, 255, 150)
    } else {
        fill(255, 0, 0)
    }
    text("Cost for anythin\':150", 117.5, 225 - 2)

    //coinPanel
    stroke(0)
    fill(255, 215, 0)
    text('Coins:' + coins, width / 12, 25)
    stroke(0)
    fill(255, 215, 0)
    text('Coins:' + enemyCoins, width - (width / 12), 25)

    //diffPanel
    fill(255, 215, 0)
    textSize(25)
    text('Difficulty:' + difficulty, width / 2, 25)
}

//PVP && TowerFight


//Income

let coins, income

const gainMoney = () => {
    if (frameCounter - 5 * frameRate() >= 0) {
        frameCounter = 0
        coins += income
        enemyCoins += income
        if (income <= maxIncome) {
            income += 10
        }
    }
}