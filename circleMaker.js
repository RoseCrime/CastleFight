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
            this.owner = "rightSide"
        } else if (castle === castle1) {
            this.mult = 1
            this.attackColor = color(0, 255, 0)
            this.owner = "leftSide"
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
        stroke(0)
        fill(this.color)
        ellipse(this.x, this.y, 15)
    }
    move() {
        if (this.owner === "leftSide") {
            if (this.moves === true)
                this.x += this.speed
        } else if (this.owner === "rightSide") {
            if (this.moves === true)
                this.x -= this.speed
        }
    }
    keepMoving() {
        this.moves = true
        this.attacks = false
    }


    resetTarget() {
        this.target = null
        this.minDist = 300
        this.min = 0

    }

    attack() {
        this.attacks = true
        this.moves = false
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

    pvp() {
        this.keepMoving()
        this.resetTarget()

        if (this.owner === "leftSide") {

            let castleInRange = abs(this.x - castle2.x) <= this.range
            let towerInRange = enemyTowers[0] && abs(this.x - enemyTowers[0].x) <= this.range
            let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range

            enemyCircles.forEach((enemyCircle, j, enemyCircles) => {
                this.min = abs(this.x - enemyCircle.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = enemyCircle
                    if (enemyInRange) {
                        this.target = this.closestEnemy
                    }

                }
            })

            if (towerInRange) {
                this.target = enemyTowers[0]
            } else if (!this.target && castleInRange) {
                this.target = castle2
            }
            if (this.target) {
                this.attack()
                this.dealDamage()
            }
        } else if (this.owner === "rightSide") {
            let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range
            let castleInRange = abs(this.x - castle1.x) <= this.range
            let towerInRange = myTowers[0] && abs(this.x - myTowers[0].x) <= this.range

            myCircles.forEach((myCircle, j, myCircles) => {
                this.min = abs(this.x - myCircle.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = myCircle
                    if (enemyInRange) {
                        this.target = this.closestEnemy
                    }

                }
            })
            if (towerInRange) {
                this.target = myTowers[0]
            } else if (!this.target && castleInRange) {
                this.target = castle1

            }
            if (this.target) {
                this.attack()
                this.dealDamage()
            }
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
const circleRefresher = () => {
    myCircles.forEach((myCircle, i, myCircles) => {
        myCircle.show()
        myCircle.move()
        myCircle.pvp()
        if (myCircle.health <= 0) {
            myCircles.splice(i, 1)
            enemyCoins += 100

        }
    })
    enemyCircles.forEach((enemyCircle, i, enemyCircles) => {
        enemyCircle.show()
        enemyCircle.move()
        enemyCircle.pvp()
        if (enemyCircle.health <= 0) {
            enemyCircles.splice(i, 1)
            coins += 100
        }
    })

}