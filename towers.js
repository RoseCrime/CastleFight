let leftTowers = []
let rightTowers = []

class Tower {
    constructor(x, y, castle) {
        if (castle === rightCastle) {
            this.owner = "right"
        } else if (castle === leftCastle) {
            this.owner = "left"
        }
        this.x = x
        this.y = y
        this.towerSize = 25
        this.health = 50000
        this.hpBarSize = 50
        this.range = 200
        this.damage = 50
    }

    show() {
        stroke(0)
        fill(220,200)
        ellipse(this.x, this.y, this.towerSize)
        fill(255, 0, 0)
        rect(this.x, this.y + this.towerSize, this.hpBarSize, 10)
        this.hpBarSize = map(this.health, 0, 50000, 0, 50)
        return this
    }

    dealDamage() {
        let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range
        stroke(255, 255, 0)
        if (enemyInRange) {
            line(this.x, this.y, this.closestEnemy.x, this.closestEnemy.y)
            this.closestEnemy.health -= this.damage
        }
        return this
    }
    resetTarget() {
        this.closestEnemy = null
        this.minDist = 200
        this.min = 0
        return this
    }
    pvp() {
        if (this.owner === "left") {
            this.resetTarget()
            rightUnits.forEach(rightUnit => {
                this.min = abs(this.x - rightUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = rightUnit
                }
            })
            this.dealDamage()
        }
        if (this.owner === "right") {
            this.resetTarget()
            leftUnits.forEach(leftUnit => {
                this.min = abs(this.x - leftUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = leftUnit
                }
            })
            this.dealDamage()
        }
        return this
    }
}

const setTowers = () => {
    leftTowers.push(new Tower(200, 150, leftCastle))
    leftTowers.push(new Tower(200, 50, leftCastle))
    rightTowers.push(new Tower(600, 150, rightCastle))
    rightTowers.push(new Tower(600, 50, rightCastle))
}

const towerRefresher = () => {
    leftTowers.forEach((leftTower, i, leftTowers) => {
        leftTower.show().pvp()
        if (leftTower.health <= 0) {
            leftTowers.splice(i, 1)
            rightCoins += 1000
        }
    })
    rightTowers.forEach((rightTower, i, rightTowers) => {
        rightTower.show().pvp()

        if (rightTower.health <= 0) {
            rightTowers.splice(i, 1)
            leftCoins += 1000
        }
    })
}