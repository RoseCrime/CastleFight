let myTowers = []
let enemyTowers = []

class Tower {
    constructor(x, y, castle) {
        if (castle === castle2) {
            this.owner = "rightSide"
        } else if (castle === castle1) {
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
    }

    dealDamage() {
        let enemyInRange = this.closestEnemy && abs(this.closestEnemy.x - this.x) <= this.range
        stroke(255, 255, 0)
        if (enemyInRange) {

            line(this.x, this.y, this.closestEnemy.x, this.closestEnemy.y)
            this.closestEnemy.health -= this.damage
        }

    }
    resetTarget() {
        this.closestEnemy = null
        this.minDist = 200
        this.min = 0

    }
    pvp() {

        if (this.owner === "leftSide") {
            this.resetTarget()
            enemyCircles.forEach((enemyCircle, j, enemyCircles) => {
                this.min = abs(this.x - enemyCircle.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = enemyCircle
                }
            })
            this.dealDamage()
        }
        if (this.owner === "rightSide") {
            this.resetTarget()
            myCircles.forEach((myCircle, j, myCircles) => {
                this.min = abs(this.x - myCircle.x)
                if (this.min < this.minDist) {
                    this.minDist = this.min
                    this.closestEnemy = myCircle
                }
            })
            this.dealDamage()
        }
    }
}

const setTowers = () => {
    myTowers.push(new Tower(200, 150, castle1))
    myTowers.push(new Tower(200, 50, castle1))
    enemyTowers.push(new Tower(600, 150, castle2))
    enemyTowers.push(new Tower(600, 50, castle2))

}

const towerRefresher = () => {
    myTowers.forEach((myTower, i, myTowers) => {
        myTower.show()
        myTower.pvp()
        if (myTower.health <= 0) {
            myTowers.splice(i, 1)
            enemyCoins += 1000
        }
    })
    enemyTowers.forEach((enemyTower, i, enemyTowers) => {
        enemyTower.show()
        enemyTower.pvp()

        if (enemyTower.health <= 0) {
            enemyTowers.splice(i, 1)
            coins += 1000
        }
    })
}