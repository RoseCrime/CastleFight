let clicked
let myCircles = []
let enemyCircles = []
const options = ['Tank', 'Damage', 'Ranged', 'Mix']


const circleMaker = (mouseX, mouseY) => {
    if (coins >= 150) {
        if (mouseX > 30 && mouseX < 70) {
            clicked = 'Tank'
            myCircles.push(new Circle(clicked, castle1))
            coins -= 150

        } else if (mouseX > 75 && mouseX < 115) {
            clicked = 'Damage'
            myCircles.push(new Circle(clicked, castle1))
            coins -= 150

        } else if (mouseX > 120 && mouseX < 160) {
            clicked = 'Ranged'
            myCircles.push(new Circle(clicked, castle1))
            coins -= 150

        } else if (mouseX > 165 && mouseX < 205) {
            clicked = 'Mix'
            myCircles.push(new Circle(clicked, castle1))
            coins -= 150
        }
    }
}

class Circle {
    constructor(clicked, castle) {
        if (castle === castle2) {
            this.mult = multiplier
            this.attackColor = color(255, 0, 0)
        } else if (castle === castle1) {
            this.mult = 1
            this.attackColor = color(0, 255, 0)
        }

        this.x = castle.x
        this.y = castle.y

        if (clicked === 'Tank') {
            this.color = color(50, 100, 200)
            this.health = 50000 * this.mult
            this.damage = 5 * this.mult
            this.range = 20
            this.speed = 0.3 * this.mult
        } else if (clicked === 'Damage') {
            this.color = color(0, 255, 0)
            this.health = 3000 * this.mult
            this.damage = 50 * this.mult
            this.range = 75
            this.speed = 3 * this.mult
        } else if (clicked === 'Ranged') {
            this.color = color(255, 0, 0)
            this.health = 3500 * this.mult
            this.damage = 5 * this.mult
            this.range = 300
            this.speed = 0.2 * this.mult

        } else if (clicked === 'Mix') {
            this.color = color(255, 215, 0)
            this.health = 5000 * this.mult
            this.damage = 15 * this.mult
            this.range = 150
            this.speed = 0.3 * this.mult
        }
    }
    show() {
        fill(this.color)
        ellipse(this.x, this.y, 15)
    }

    moveRight() {
        if (this.moves === true)
            this.x += this.speed
    }
    moveLeft() {
        if (this.moves === true)
            this.x -= this.speed
    }
    resetTarget() {
        this.target = null
        this.minDist = 500
        this.min = 0

    }

    attack() {
        this.attacks = true
        this.moves = false

    }
    keepMoving() {
        this.moves = true
        this.attacks = false
    }
    dealDamage() {
        if (this.target) {
            noFill()
            stroke(this.attackColor)

            beginShape()

            curveVertex(this.x, this.y + 300)
            curveVertex(this.x, this.y)
            curveVertex(this.target.x, this.target.y)
            curveVertex(this.target.x, this.target.y - 300)

            endShape()

            this.target.health -= this.damage
        }
    }

}

const EnemyCircleMaker = () => {
    this.x = castle2.x + castle2.size
    this.y = castle2.y + castle2.size / 2
    if (difficulty != 'Impossible' && difficulty != 'Hard' && enemyCoins >= 150) {
        enemyCircles.push(new Circle(random(options), castle2))
        enemyCoins -= 150
    } else if (enemyCoins >= 100) {
        enemyCircles.push(new Circle(random(options), castle2))
        enemyCoins -= 100
    }
}