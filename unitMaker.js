let clicked
let leftUnits = []
let rightUnits = []
const options = ['Tank', 'Damage', 'Ranged', 'Mix']


const unitMaker = (mouseX, mouseY) => {
    if (leftCoins >= 150) {
        if (mouseX > 30 && mouseX < 70) {
            clicked = 'Tank'
            leftUnits.push(new Unit(clicked, leftCastle))
            leftCoins -= 150
        } else if (mouseX > 75 && mouseX < 115) {
            clicked = 'Damage'
            leftUnits.push(new Unit(clicked, leftCastle))
            leftCoins -= 150

        } else if (mouseX > 120 && mouseX < 160) {
            clicked = 'Ranged'
            leftUnits.push(new Unit(clicked, leftCastle))
            leftCoins -= 150

        } else if (mouseX > 165 && mouseX < 205) {
            clicked = 'Mix'
            leftUnits.push(new Unit(clicked, leftCastle))
            leftCoins -= 150
        }
    }
}

class Unit {
    constructor(clicked, castle) {
        if (castle === rightCastle) {
            this.mult = multiplier
            this.attackColor = color(255, 0, 0)
            this.owner = "right"
        } else if (castle === leftCastle) {
            this.mult = 1
            this.attackColor = color(0, 255, 0)
            this.owner = "left"
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
        return this
    }
    move() {
        if (this.owner === "left") {
            if (this.moves === true)
                this.x += this.speed
        } else if (this.owner === "right") {
            if (this.moves === true)
                this.x -= this.speed
        }
        return this
    }
    keepMoving() {
        this.moves = true
        this.attacks = false
        return this
    }


    resetTarget() {
        this.target = null
        this.minDist = 300
        this.min = 0
        return this
    }

    attack() {
        this.attacks = true
        this.moves = false
        return this
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
        return this
    }

    pvp() {
        this.keepMoving()
        this.resetTarget()

        if (this.owner === "left") {

            let castleInRange = abs(this.x - rightCastle.x) <= this.range
            let towerInRange = rightTowers[0] && abs(this.x - rightTowers[0].x) <= this.range
            let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range

            rightUnits.forEach(rightUnit => {
                this.min = abs(this.x - rightUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = rightUnit
                    if (enemyInRange)this.target = this.closestEnemy     
                }
            })

            if (towerInRange) {
                this.target = rightTowers[0]
            } else if (!this.target && castleInRange) {
                this.target = rightCastle
            }
            if (this.target) {
                this.attack()
                this.dealDamage()
            }
        } else if (this.owner === "right") {

            let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range
            let castleInRange = abs(this.x - leftCastle.x) <= this.range
            let towerInRange = leftTowers[0] && abs(this.x - leftTowers[0].x) <= this.range

            leftUnits.forEach(leftUnit => {
                this.min = abs(this.x - leftUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = leftUnit
                    if (enemyInRange) {
                        this.target = this.closestEnemy
                    }
                }
            })
            if (towerInRange) {
                this.target = leftTowers[0]
            } else if (!this.target && castleInRange) {
                this.target = leftCastle
            }
            if (this.target) {
                this.attack()
                this.dealDamage()
            }
        }
        return this
    }
}

const rightUnitMaker = () => {
    this.x = rightCastle.x + rightCastle.size
    this.y = rightCastle.y + rightCastle.size / 2
    if (difficulty != 'Impossible' && difficulty != 'Hard' && rightCoins >= 150) {
        rightUnits.push(new Unit(random(options), rightCastle))
        rightCoins -= 150
    } else if (rightCoins >= 100) {
        rightUnits.push(new Unit(random(options), rightCastle))
        rightCoins -= 100
    }
}
const unitRefresher = () => {
    leftUnits.forEach((leftUnit, i, leftUnits) => {
        leftUnit.show().move().pvp()
        if (leftUnit.health <= 0) {
            leftUnits.splice(i, 1)
            rightCoins += 100
        }
    })
    rightUnits.forEach((rightUnit, i, rightUnits) => {
        rightUnit.show().move().pvp()
        if (rightUnit.health <= 0) {
            rightUnits.splice(i, 1)
            leftCoins += 100
        }
    })

}