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
    if (mouseIsClicked) {
        if (mouseX >= 295 &&
            mouseX < 295 + 500 &&
            mouseY >= 215 &&
            mouseY <= 215 + 80) {
            difficulty = null;
            reset();
        }
    }
}