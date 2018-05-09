class Castle {
    constructor(side) {
        this.side = side

        if (this.side == 'left') {
            this.x = 1 / 15 * width
        }
        if (this.side == 'right') {
            this.x = 14 / 15 * width
        }

        this.y = 100
        this.size = 50
        this.health = 500000
        this.hpBarSize = 50
    }
    refresh() {
        stroke(0)
        fill(220, 150)
        if (this.side == 'left') {
            rect(this.x, this.y, this.size, this.size)

            //health display
            fill(255, 0, 0)
            rect(this.x, this.y + this.size / 2 + this.size / 5, this.hpBarSize, 10)
            this.hpBarSize = map(this.health, 0, 500000, 0, 50)
        }
        if (this.side == 'right') {
            rect(this.x, this.y, this.size, this.size)

            //health display
            fill(255, 0, 0)
            rect(this.x, this.y + this.size / 2 + this.size / 5, this.hpBarSize, 10)
            this.hpBarSize = map(this.health, 0, 500000, 0, 50)
        }

        return this
    }
}

const setCastles = () => {
    leftCastle = new Castle('left')
    rightCastle = new Castle('right')
}
