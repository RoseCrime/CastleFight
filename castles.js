class MyCastle {
    constructor() {
        this.x = 1 / 15 * width
        this.y = 100
        this.size = 50
        this.health = 500000
        this.healthbarSize = 50
    }
    refresh() {
        stroke(0)
        fill(255)
        rect(this.x, this.y, this.size, this.size)
        fill(0, 50)
        rect(this.x, this.y, this.size, this.size)
        return this
    }
    healthDisplay() {
        stroke(0)
        fill(255, 0, 0)
        rect(this.x, this.y + this.size / 2 + this.size / 5, this.healthbarSize, 10)
        this.healthbarSize = map(this.health, 0, 500000, 0, 50)
        return this
    }
}

class EnemyCastle {
    constructor() {
        this.x = 14 / 15 * width
        this.y = 100
        this.size = 50
        this.health = 500000
        this.healthbarSize = 50
    }
    refresh() {
        stroke(0)
        fill(255)
        rect(this.x, this.y, this.size, this.size)
        fill(0, 50)
        rect(this.x, this.y, this.size, this.size)
        return this
    }

    healthDisplay(){
        fill(255, 0, 0)
        rect(this.x, this.y + this.size / 2 + this.size / 5, this.healthbarSize, 10)
        this.healthbarSize = map(this.health, 0, 500000, 0, 50)
        return this
    }
}

const setCastles = () => {
    leftCastle = new MyCastle()
    rightCastle = new EnemyCastle()
}