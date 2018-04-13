let clicked
let myUnits = []
let enemyUnits = []
const options = ['Tank', 'Damage', 'Ranged', 'Mix']


const unitMaker = (mouseX, mouseY) => {
    if (coins >= 150) {
        if (mouseX > 30 && mouseX < 70) {
            clicked = 'Tank'
            myUnits.push(new Unit(clicked, leftCastle))
            coins -= 150
        } else if (mouseX > 75 && mouseX < 115) {
            clicked = 'Damage'
            myUnits.push(new Unit(clicked, leftCastle))
            coins -= 150

        } else if (mouseX > 120 && mouseX < 160) {
            clicked = 'Ranged'
            myUnits.push(new Unit(clicked, leftCastle))
            coins -= 150

        } else if (mouseX > 165 && mouseX < 205) {
            clicked = 'Mix'
            myUnits.push(new Unit(clicked, leftCastle))
            coins -= 150
        }
    }
}

class Unit {
    constructor(clicked, castle) {
        if (castle === rightCastle) {
            this.mult = multiplier
            this.attackColor = color(255, 0, 0)
            this.owner = "rightSide"
        } else if (castle === leftCastle) {
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
        return this
    }
    move() {
        if (this.owner === "leftSide") {
            if (this.moves === true)
                this.x += this.speed
        } else if (this.owner === "rightSide") {
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

        if (this.owner === "leftSide") {

            let castleInRange = abs(this.x - rightCastle.x) <= this.range
            let towerInRange = enemyTowers[0] && abs(this.x - enemyTowers[0].x) <= this.range
            let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range

            enemyUnits.forEach(enemyUnit => {
                this.min = abs(this.x - enemyUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = enemyUnit
                    if (enemyInRange) {
                        this.target = this.closestEnemy
                    }
                }
            })

            if (towerInRange) {
                this.target = enemyTowers[0]
            } else if (!this.target && castleInRange) {
                this.target = rightCastle
            }
            if (this.target) {
                this.attack()
                this.dealDamage()
            }
        } else if (this.owner === "rightSide") {

            let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range
            let castleInRange = abs(this.x - leftCastle.x) <= this.range
            let towerInRange = myTowers[0] && abs(this.x - myTowers[0].x) <= this.range

            myUnits.forEach(myUnit => {
                this.min = abs(this.x - myUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = myUnit
                    if (enemyInRange) {
                        this.target = this.closestEnemy
                    }
                }
            })
            if (towerInRange) {
                this.target = myTowers[0]
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

const EnemyUnitMaker = () => {
    this.x = rightCastle.x + rightCastle.size
    this.y = rightCastle.y + rightCastle.size / 2
    if (difficulty != 'Impossible' && difficulty != 'Hard' && enemyCoins >= 150) {
        enemyUnits.push(new Unit(random(options), rightCastle))
        enemyCoins -= 150
    } else if (enemyCoins >= 100) {
        enemyUnits.push(new Unit(random(options), rightCastle))
        enemyCoins -= 100
    }
}
const unitRefresher = () => {
    myUnits.forEach((myUnit, i, myUnits) => {
        myUnit.show().move().pvp()
        if (myUnit.health <= 0) {
            myUnits.splice(i, 1)
            enemyCoins += 100

        }
    })
    enemyUnits.forEach((enemyUnit, i, enemyUnits) => {
        enemyUnit.show().move().pvp()
        if (enemyUnit.health <= 0) {
            enemyUnits.splice(i, 1)
            coins += 100
        }
    })

}