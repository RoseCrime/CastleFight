function choiseDiff() {

    fill(100, 255, 220);
    textSize(50);
    text('Game Made by RoseCrime', 100, height - 5);

    fill(144, 251, 114);
    text('Easy', 40, 100);
    fill(144, 251, 114, 70);
    rect(20, 58, 147.5, 55);

    fill(0, 92, 247);
    text('Medium', 319, 100);
    fill(111, 163, 250, 70);
    rect(299, 58, 214, 55);

    fill(247, 0, 0);
    text('Hard', 650, 100);
    fill(252, 146, 146, 70);
    rect(630, 58, 148, 55);

    fill(0);
    text('Impossible', 285.5, 200);
    fill(100, 0, 0, 70);
    rect(265.5, 158, 277.5, 55);

    if (mouseX >= 20 && mouseX <= 167.5 && mouseY >= 58 && mouseY <= 113) {
        line(40, 105, 20 + 130, 105);
        if (mouseIsPressed) {
            difficulty = 'Easy';
            setDiff();
            reset();
        }
    } else if (mouseX >= 299 && mouseX <= 299 + 214 && mouseY >= 58 && mouseY <= 58 + 55) {
        if (mouseIsPressed) {
            difficulty = 'Medium';
            setDiff();
            reset();
        }
        line(299 + 20, 105, 299 + 214 - 20, 105);
    } else if (mouseX >= 630 && mouseX <= 630 + 148 && mouseY >= 58 && mouseY <= 58 + 55) {
        if (mouseIsPressed) {
            difficulty = 'Hard';
            setDiff();
            reset();
        }
        line(630 + 20, 105, 630 + 148 - 20, 105);
    } else if (mouseX >= 265.5 && mouseX <= 265.5 + 277.5 && mouseY >= 158 && mouseY <= 158 + 55) {
        if (mouseIsPressed) {
            difficulty = 'Impossible';
            setDiff();
            reset();
        }
        line(265.5 + 20, 158 + 55 - 7, 265.5 + 277.5 - 20, 158 + 55 - 7);
        fill(255, 0, 0);
        textSize(30);
        text('WHO ARE YOU TRYING TO IMPRESS?', 140, 250);
    }
}


function setDiff() {
    if (difficulty == 'Easy') {
        multiplier = 0.75;
    } else if (difficulty == 'Medium') {
        multiplier = 1.0;
    } else if (difficulty == 'Hard') {
        multiplier = 1.25
    } else if (difficulty == 'Impossible') {
        multiplier = 1.5;
    }
}
