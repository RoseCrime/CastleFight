const endGameStage = () => {

    if (leftCastle.health <= 0 || rightCastle.health <= 0) {
        textSize(150)
        
        if (leftCastle.health <= 0) {
            fill(255, 150, 150)
            text('You lost', width / 2, 175)

        } else if (rightCastle.health <= 0) {
            fill(50, 255, 150)
            text('Victory!', width / 2, 175)
        }
        
        finished = true
    }

    //New Game text
    if (finished === true) {
        textSize(100)
        fill(0)
        noStroke()
        text('New Game', 2 / 3 * width, height - 10)
        noFill()
        stroke(255)
        rect(2 / 3 * width, height - 40 - 5, 500, 80)

        //new game hover
        if (finished === true && mouseX >= 295 && mouseX < 295 + 500 && mouseY >= 215 && mouseY <= 215 + 80) {
            fill(100, 150, 200)
            text('New Game', 2 / 3 * width, height - 10)
        }

        //stop
        leftUnits.forEach(leftUnit => {
            leftUnit.damage = 0
            leftUnit.speed = 0
        })
        rightUnits.forEach(rightUnit => {
            rightUnit.damage = 0
            rightUnit.speed = 0
        })

        income = 0
        leftCoins = 0
        rightCoins = 0

        if (mouseIsClicked) {
            if ((mouseX >= 295) &&
                (mouseX < 295 + 500) &&
                (mouseY >= 215) &&
                (mouseY <= 215 + 80)) {
                difficulty = null
                reset()
            }
        }
    }
}
