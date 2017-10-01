let difficulty;
let multiplier;
let diffOptions = [];
let choise;
let madeBy;

function diffOptionsMaker() {

    diffOptions.push(new DiffBlock('Easy', 2 / 10 * width, 4 / 10 * height, 25, color(144, 251, 114), color(0), true, true));

    diffOptions.push(new DiffBlock('Medium', width / 2, 4 / 10 * height, 25, color(0, 92, 247), color(0), true, true));
    diffOptions.push(new DiffBlock('Hard', 8 / 10 * width, 4 / 10 * height, 25, color(247, 0, 0), color(0), true, true));
    diffOptions.push(new DiffBlock('Impossible', width / 2, 7 / 10 * height, 25, color(0), color(255, 100, 100), true, true));

    diffTitle = new DiffBlock('Choise Difficulty:', width / 2, 1 / 10 * height, 25, color(255, 215, 0), color(0), true);
    madeBy = new DiffBlock('Game Made by RoseCrime', width / 2, 9.5 / 10 * height, 25, color(100, 220, 100), color(0), true);

    for (i = 0; i < diffOptions.length; i++) {
        diffOptions[i].choiseDiff = function() {
            if (this.mouseInArea) {
                if (mouseIsPressed) {
                    difficulty = this.txt;
                    setDiff();
                    reset();
                }
            }
        }
}


function diffStage() {
    if (!difficulty) {

        for (i = 0; i < diffOptions.length; i++) {
            textSize(25);
            strokeWeight(3);

            diffOptions[i].show();

            diffOptions[i].choiseDiff();
        }
        diffTitle.show();
        madeBy.show();
        strokeWeight(2);
    }
}


function setDiff() {
    if (difficulty == "Easy") {
        multiplier = 0.75;
    } else if (difficulty == "Medium") {
        multiplier = 1.0;
    } else if (difficulty == "Hard") {
        multiplier = 1.25
    } else if (difficulty == "Impossible") {
        multiplier = 1.5;
    }
}

function DiffBlock(txt, x, y, size, color, str, block = null, hover = null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stroke = str;
    this.size = size;

    this.hover = hover;
    this.block = block;

    this.txt = txt;

    this.txtSize = size;
    textSize(this.txtSize);

    this.txtWidth = textWidth(this.txt);

    this.show = function() {

        fill(this.color);
        stroke(this.stroke);

        if (this.hover) {

            this.mouseInArea = (
                (mouseX <= (this.x + (this.txtWidth / 2))) &&
                (mouseX >= (this.x - (this.txtWidth / 2))) &&
                (mouseY <= (this.y + (this.txtSize / 2))) &&
                (mouseY >= (this.y - (this.txtSize / 2)))
            )


            if (this.mouseInArea) {
                fill(0);
                stroke(255);
                line(this.x - 1 / 2 * this.txtWidth, this.y + this.txtSize, this.x + 1 / 2 * this.txtWidth, this.y + this.txtSize);
            }
        }
        text(this.txt, this.x, this.y, this.txtWidth * 1.1, this.txtSize);

        if (this.block) {
            stroke(255);
            noFill();
            rect(this.x, this.y, this.txtWidth * 1.5, this.txtSize * 1.5);
        }

    }
}