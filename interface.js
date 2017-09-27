function circlePanel() {
    rectMode(CORNER);
    stroke(0);
    fill(255);
    rect(25, 225, 140 + 40 + 5, 50);
    textSize(15);
    fill(50, 100, 200);
    rect(25 + 5, 225 + 5, 40, 40);
    text('tank', 25 + 10, 225 + 70);

    fill(0, 255, 0);
    rect(25 + 50, 225 + 5, 40, 40);
    text('DD', 25 + 57.5, 225 + 70);

    fill(255, 0, 0);
    rect(25 + 95, 225 + 5, 40, 40);
    text('Ranged', 25 + 90, 225 + 70);

    fill(255, 215, 0);
    rect(25 + 140, 225 + 5, 40, 40);
    text('Mix', 25 + 150, 225 + 70);
    textSize(20);
    if (coins >= 150) {
        fill(0, 255, 150)
    } else {
        fill(255, 0, 0)
    }
    text("Cost for anythin\':150", 25 + 1, 225 - 2);
}


function coinPanel() {
    stroke(0);
    fill(255, 215, 0);
    text('Coins:' + coins, 25, 25);
}

function enemyCoinPanel() {
    stroke(0);
    fill(255, 215, 0);
    text('Coins:' + enemyCoins, 675, 25);
}

function panelRefresher() {
    circlePanel();
    coinPanel();
    enemyCoinPanel();
}

function newGameHover() {
    if (finished === true && mouseX >= 295 && mouseX < 295 + 500 && mouseY >= 215 && mouseY <= 215 + 80) {
        fill(50, 255, 255);
        text('New Game', 295, height - 10);
    }
}

function mouseClicked() {
    if (mouseX >= 25 && mouseY >= 225 && mouseX <= 25 + 185 && mouseY <= 225 + 50) {
        circleMaker(mouseX, mouseY);
    }
    if (finished === true && mouseX >= 295 && mouseX < 295 + 500 && mouseY >= 215 && mouseY <= 215 + 80) {
        difficulty = null;
    }
}

function gameEnded() {
    textSize(200);
    stroke(0);
    if (castle1.health <= 0) {
        fill(255, 150, 150);
        text('You lost', 50, 200);
        finished = true;
    } else if (castle2.health <= 0) {
        fill(50, 255, 150);
        text('You won!', 25, 200);
        finished = true;
    }
    if (finished === true) {
        textSize(100);
        fill(0);
        text('New Game', 295, height - 10);
        noFill();
        stroke(255);
        rect(295, 215, 500, 80);
        newGameHover();
        stop();
    }
}

function diffPanel() {
    fill(255, 215, 0);
    textSize(25);
    text('Difficulty:' + difficulty, 275, 25);
}