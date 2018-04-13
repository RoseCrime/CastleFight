let myTowers = []
let enemyTowers = []

class Tower {
    constructor(x, y, castle) {
        if (castle === rightCastle) {
            this.owner = "rightSide"
        } else if (castle === leftCastle) {
            this.owner = "leftSide"
        }
        this.x = x
        this.y = y
        this.towerSize = 25
        this.health = 50000
        this.healthbarSize = 50
        this.range = 200
        this.damage = 50
    }

    show() {
        stroke(0)
        fill(255)
        ellipse(this.x, this.y, this.towerSize)
        fill(255, 0, 0)
        rect(this.x, this.y + this.towerSize, this.healthbarSize, 10)
        this.healthbarSize = map(this.health, 0, 50000, 0, 50)
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
        if (this.owner === "leftSide") {
            this.resetTarget()
            enemyUnits.forEach(enemyUnit => {
                this.min = abs(this.x - enemyUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = enemyUnit
                }
            })
            this.dealDamage()
        }
        if (this.owner === "rightSide") {
            this.resetTarget()
            myUnits.forEach(myUnit => {
                this.min = abs(this.x - myUnit.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = myUnit
                }
            })
            this.dealDamage()
        }
        return this
    }
}

const setTowers = () => {
    myTowers.push(new Tower(200, 150, leftCastle))
    myTowers.push(new Tower(200, 50, leftCastle))
    enemyTowers.push(new Tower(600, 150, rightCastle))
    enemyTowers.push(new Tower(600, 50, rightCastle))
}

const towerRefresher = () => {
    myTowers.forEach((myTower, i, myTowers) => {
        myTower.show().pvp()
        if (myTower.health <= 0) {
            myTowers.splice(i, 1)
            enemyCoins += 1000
        }
    })
    enemyTowers.forEach((enemyTower, i, enemyTowers) => {
        enemyTower.show().pvp()

        if (enemyTower.health <= 0) {
            enemyTowers.splice(i, 1)
            coins += 1000
        }
    })
}