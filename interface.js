function setPanels() {

    //circlePanel
    textSize(12);
    stroke(0);
    fill(255, 100);
    rect(117.5, 250, 180, 50);

    fill(50, 100, 200);
    ellipse(50, 250, 40, 40);
    text('tank', 50, 295);

    fill(0, 255, 0);
    ellipse(95, 250, 40, 40);
    text('Damage', 95, 295);

    fill(255, 0, 0);
    ellipse(140, 250, 40, 40);
    text('Range', 140, 295);

    fill(255, 215, 0);
    ellipse(185, 250, 40, 40);
    text('Mix', 185, 295);
    textSize(20);
    if (coins >= 150) {
        fill(0, 255, 150)
    } else {
        fill(255, 0, 0)
    }
    text("Cost for anythin\':150", 117.5, 225 - 2);

    //coinPanel
    stroke(0);
    fill(255, 215, 0);
    text('Coins:' + coins, width / 12, 25);
    stroke(0);
    fill(255, 215, 0);
    text('Coins:' + enemyCoins, width - (width / 12), 25);

    //diffPanel
    fill(255, 215, 0);
    textSize(25);
    text('Difficulty:' + difficulty, width / 2, 25);
}

function endGameStage() {
    textSize(150);
    if (castle1.health <= 0) {
        fill(255, 100, 100);
        text('You lost', width / 2, 175);
        finished = true;
    } else if (castle2.health <= 0) {
        fill(50, 255, 150);
        text('Victory!', width / 2, 175);
        finished = true;
    }
    if (finished == true) {
        textSize(100);
        fill(0);
        text('New Game', 2 / 3 * width, height - 10);
        noFill();
        stroke(255);
        rect(2 / 3 * width, height - 40 - 5, 500, 80);

        //new game hover
        if (finished === true && mouseX >= 295 && mouseX < 295 + 500 && mouseY >= 215 && mouseY <= 215 + 80) {
            fill(50, 255, 200);
            text('New Game', 2 / 3 * width, height - 10);
        }

        //stop
        for (i = 0; i < myCircles.length; i++) {
            myCircles[i].damage = 0;
            myCircles[i].speed = 0;
        }
        for (i = 0; i < enemyCircles.length; i++) {
            enemyCircles[i].damage = 0;
            enemyCircles[i].speed = 0;
        }
        income = 0;
    }
}

function mouseClicked() {
    if (difficulty &&
        mouseX > 30 &&
        mouseX < 205 &&
        mouseY > 230 &&
        mouseY < 270) {
        circleMaker(mouseX, mouseY);
    }
    if (finished === true &&
        mouseX >= 295 &&
        mouseX < 295 + 500 &&
        mouseY >= 215 &&
        mouseY <= 215 + 80) {
        difficulty = null;
    }
}