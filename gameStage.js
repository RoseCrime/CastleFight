const gameStage = () => {
    if (difficulty) {
        strokeWeight(3)
        castle1.refresh()
        castle1.healthDisplay()

        castle2.refresh()
        castle2.healthDisplay()

        towerRefresher()
        setPanels()
        EnemyCircleMaker()

        myCircles.forEach((myCircle) => {
            myCircle.show()
            myCircle.moveRight()
        })
        enemyCircles.forEach((enemyCircle) => {
            enemyCircle.show()
            enemyCircle.moveLeft()
        })

        if (mouseIsClicked) {
            if (mouseX > 30 &&
                mouseX < 205 &&
                mouseY > 230 &&
                mouseY < 270) {
                circleMaker(mouseX, mouseY)
            }
        }
        gainMoney()
        pvp()
        towerfight()
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

const pvp = () => {
    for (let i = 0; i < myCircles.length; i++) {
        myCircles[i].keepMoving()
        myCircles[i].resetTarget()
        for (let j = 0; j < enemyCircles.length; j++) {
            myCircles[i].min = abs(myCircles[i].x - enemyCircles[j].x)
            if (myCircles[i].min < myCircles[i].minDist) {
                myCircles[i].minDist = myCircles[i].min
                myCircles[i].closestEnemy = enemyCircles[j]
                if (myCircles[i].minDist <= myCircles[i].range) {
                    myCircles[i].target = myCircles[i].closestEnemy

                }
                if (enemyCircles[j].health <= 0) {
                    enemyCircles.splice(j, 1)
                    coins += 100
                }
            }
        }

        if (enemyTowers[0] && abs(myCircles[i].x - enemyTowers[0].x) <= myCircles[i].range) {
            myCircles[i].target = enemyTowers[0]
        }


        if (!myCircles[i].closestEnemy && abs(myCircles[i].x - castle2.x) <= myCircles[i].range) {
            myCircles[i].target = castle2

        }
        if (myCircles[i].target) {
            myCircles[i].attack()
            myCircles[i].dealDamage()
        }
    }

    for (let j = 0; j < enemyCircles.length; j++) {
        enemyCircles[j].resetTarget()
        enemyCircles[j].keepMoving()


        for (let i = 0; i < myCircles.length; i++) {
            enemyCircles[j].min = abs(enemyCircles[j].x - myCircles[i].x)
            if (enemyCircles[j].min < enemyCircles[j].minDist) {
                enemyCircles[j].minDist = enemyCircles[j].min
                enemyCircles[j].closestEnemy = myCircles[i]
                if (enemyCircles[j].minDist <= enemyCircles[j].range) {
                    enemyCircles[j].target = enemyCircles[j].closestEnemy
                }
                if (myCircles[i].health <= 0) {
                    myCircles.splice(i, 1)
                    enemyCoins += 100
                }
            }
        }
        if (myTowers[0] && abs(enemyCircles[j].x - myTowers[0].x) <= enemyCircles[j].range) {
            enemyCircles[j].target = myTowers[0]
        }
        if (!enemyCircles[j].closestEnemy && abs(enemyCircles[j].x - castle1.x) <= enemyCircles[j].range) {
            enemyCircles[j].target = castle1
        }
        if (enemyCircles[j].target) {
            enemyCircles[j].attack()
            enemyCircles[j].dealDamage()
        }
    }
}

const towerfight = () => {
    for (let i = 0; i < myTowers.length; i++) {
        for (let j = 0; j < enemyCircles.length; j++) {
            if (myTowers[i] && enemyCircles[j]) {
                myTowers[i].min = abs(myTowers[i].x - enemyCircles[j].x)
                if (myTowers[i].min < myTowers[i].minDist) {
                    myTowers[i].minDist = myTowers[i].min
                    myTowers[i].closestEnemy = enemyCircles[j]
                    if (enemyCircles[j].health <= 0) {
                        enemyCircles.splice(j, 1)
                        coins += 100
                    }
                }
            }
        }
        if (myTowers[i].closestEnemy) {
            if (myTowers[i].minDist <= myTowers[i].range) {
                myTowers[i].dealDamage()
                myTowers[i].resetTarget()
            }
        }
    }
    for (let i = 0; i < enemyTowers.length; i++) {
        for (let j = 0; j < myCircles.length; j++) {
            if (enemyTowers[i] && myCircles[j]) {
                enemyTowers[i].min = abs(enemyTowers[i].x - myCircles[j].x)
                if (enemyTowers[i].min < enemyTowers[i].minDist) {
                    enemyTowers[i].minDist = enemyTowers[i].min
                    enemyTowers[i].closestEnemy = myCircles[j]
                    if (myCircles[j].health <= 0) {
                        myCircles.splice(j, 1)
                        enemyCoins += 100
                    }
                }
            }
        }
        if (enemyTowers[i].closestEnemy) {
            if (enemyTowers[i].minDist <= enemyTowers[i].range) {
                enemyTowers[i].dealDamage()
                enemyTowers[i].resetTarget()
            }
        }
    }
}

//Income

let coins

const gainMoney = () => {
    if (frameCounter - 5 * frameRate() >= 0) {
        frameCounter = 0
        coins += income
        enemyCoins += income
        if (income <= maxIncome) {
            income += 5
        }
    }
}