function MyCastle() {
    this.x = 50;
    this.y = 100;
    this.size = 50;
    this.health = 500000;
    this.healthbarSize = 50;

    this.refresh = function() {
        rectMode(CENTER);
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.size, this.size);
        fill(0, 0, 0, 50);
        rect(this.x, this.y, this.size, this.size);
        this.healthDisplay = function() {
            stroke(0);
            fill(255, 0, 0);
            rect(this.x, this.y + this.size / 2 + this.size / 5, this.healthbarSize, 10);
            this.healthbarSize = map(this.health, 0, 500000, 0, 50);
        }
    }
}

function EnemyCastle() {
    this.x = 750;
    this.y = 100;
    this.size = 50;
    this.health = 500000;
    this.healthbarSize = 50;

    this.refresh = function() {
        rectMode(CENTER);
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.size, this.size);
        fill(0, 0, 0, 50);
        rect(this.x, this.y, this.size, this.size);
    }
    this.healthDisplay = function() {
        stroke(0);
        fill(255, 0, 0);
        rect(this.x, this.y + this.size / 2 + this.size / 5, this.healthbarSize, 10);
        this.healthbarSize = map(this.health, 0, 500000, 0, 50);
    }
}

function setCastles() {
    castle1 = new MyCastle();
    castle2 = new EnemyCastle();
}