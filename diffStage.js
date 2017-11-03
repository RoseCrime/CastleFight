let difficulty,multiplier
let diffOptions = []
let txt, txtSize, txtWidth, x, y

const diffOptionsMaker = () => {

    diffOptions.push(new DiffBlock('Easy', 2 / 10 * width, 4 / 10 * height, 25, color(144, 251, 114), color(0)))
    diffOptions.push(new DiffBlock('Medium', width / 2, 4 / 10 * height, 25, color(0, 92, 247), color(0)))
    diffOptions.push(new DiffBlock('Hard', 8 / 10 * width, 4 / 10 * height, 25, color(247, 0, 0), color(0)))
    diffOptions.push(new DiffBlock('Impossible', width / 2, 7 / 10 * height, 25, color(0), color(255, 100, 100)))

}

const diffText = () => {
    textSize(25)
    strokeWeight(3)
    txtSize = textSize()

    stroke(0)
    txt = "Choise Difficulty:"
    fill(255, 215, 0)
    txtWidth = textWidth(txt)
    x = width / 2
    y = 1 / 10 * height
    text(txt, x, y, txtWidth * 1.1, txtSize)
    stroke(255)
    noFill()
    rect(x, y, txtWidth * 1.5, txtSize * 1.5)

    stroke(0)
    txt = "Game Made by RoseCrime"
    fill(100, 220, 100)
    txtWidth = textWidth(txt)
    x = width / 2
    y = 9.5 / 10 * height
    text(txt, x, y, txtWidth * 1.1, txtSize)

    stroke(255)
    noFill()
    rect(x, y, txtWidth * 1.5, txtSize * 1.5)
}

const diffStage = () => {
    if (!difficulty) {
        diffText()
        diffOptions.forEach((diffOption) => {
            diffOption.show()
            diffOption.choiseDiff()
        })
    }
}

class DiffBlock {
    constructor(txt, x, y, size, color, str) {
        this.x = x
        this.y = y
        this.color = color
        this.stroke = str
        this.size = size
        this.txt = txt

        this.txtSize = size
        textSize(this.txtSize)

        this.txtWidth = textWidth(this.txt)
    }
    show() {
        fill(this.color)
        stroke(this.stroke)
        this.mouseInArea = (
            (mouseX <= (this.x + (this.txtWidth / 2))) &&
            (mouseX >= (this.x - (this.txtWidth / 2))) &&
            (mouseY <= (this.y + (this.txtSize / 2))) &&
            (mouseY >= (this.y - (this.txtSize / 2)))
        )
        if (this.mouseInArea) {
            fill(0)
            stroke(255)
            line(this.x - 1 / 2 * this.txtWidth, this.y + this.txtSize, this.x + 1 / 2 * this.txtWidth, this.y + this.txtSize)
        }
        text(this.txt, this.x, this.y, this.txtWidth * 1.1, this.txtSize)
        stroke(255)
        noFill()
        rect(this.x, this.y, this.txtWidth * 1.5, this.txtSize * 1.5)
    }

    choiseDiff() {
        if (this.mouseInArea) {
            if (mouseIsClicked) {
                difficulty = this.txt
                if (difficulty == "Easy") {
                    multiplier = 0.75
                } else if (difficulty == "Medium") {
                    multiplier = 1.0
                } else if (difficulty == "Hard") {
                    multiplier = 1.25
                } else if (difficulty == "Impossible") {
                    multiplier = 1.5
                }
                reset()
            }
        }
    }
}