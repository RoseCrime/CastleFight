let myTowers = []
let enemyTowers = []

class Tower {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.towerSize = 25
        this.health = 50000
        this.healthbarSize = 50
        this.range = 200
        this.damage = 50
        this.min = null
        this.minDist = 200
        this.closestEnemy = null
    }

    refresh() {
        fill(255)
        ellipse(this.x, this.y, this.towerSize)
    }
    healthDisplay() {
        fill(255, 0, 0)
        rect(this.x, this.y + this.towerSize, this.healthbarSize, 10)
        this.healthbarSize = map(this.health, 0, 50000, 0, 50)
    }
    dealDamage() {
        stroke(255, 0, 255)
        line(this.x, this.y, this.closestEnemy.x, this.closestEnemy.y)
        this.closestEnemy.health -= this.damage
    }
    resetTarget() {
        this.closestEnemy = 0
        this.minDist = 200
        this.min = 0
    }
}

const setTowers = () => {
    myTowers.push(new Tower(200, 150))
    myTowers.push(new Tower(200, 50))
    enemyTowers.push(new Tower(600, 150))
    enemyTowers.push(new Tower(600, 50))

}

const towerRefresher = () => {
    myTowers.forEach((item, i, array) => {
        array[i].refresh()
        array[i].healthDisplay()
        if (array[i].health <= 0) {
            array.splice(i, 1)
            enemyCoins += 1000
        }
    })
    enemyTowers.forEach((item, i, array) => {
        array[i].refresh()
        array[i].healthDisplay()

        if (array[i].health <= 0) {
            array.splice(i, 1)
            enemyCoins += 1000
        }
    })
}