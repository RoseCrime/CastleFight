let myTowers = [];
let enemyTowers = [];

function Tower(x, y) {
    this.x = x;
    this.y = y;
    this.towerSize = 25;
    this.health = 50000;

    this.healthbarSize = 50;

    this.range = 200;
    this.damage = 50;
    this.min = null;
    this.minDist = 200;
    this.closestEnemy = null;

    this.refresh = function() {
        fill(255);
        ellipse(this.x, this.y, this.towerSize, this.towerSize);
    }
    this.healthDisplay = function() {
        fill(255, 0, 0);
        rect(this.x, this.y + this.towerSize, this.healthbarSize, 10);
        this.healthbarSize = map(this.health, 0, 50000, 0, 50);
    }
    this.dealDamage = function() {
        stroke(255,0,255);
        line(this.x, this.y, this.closestEnemy.x, this.closestEnemy.y);
        this.closestEnemy.health -= this.damage;
    }
    this.resetTarget = function() {
        this.closestEnemy = 0;
        this.minDist = 200;
        this.min = 0;
    }
}

function towerMaker() {
    myTowers.push(new Tower(200, 150 - 1 / 2 * 25 + 3));
    myTowers.push(new Tower(200, 50 + 1 / 2 * 25 - 3));

    enemyTowers.push(new Tower(600, 150 - 1 / 2 * 25 + 3));
    enemyTowers.push(new Tower(600, 50 + 1 / 2 * 25 - 3));

}

function towerRefresher() {

    for (i = 0; i < myTowers.length; i++) {
        myTowers[i].refresh();
        myTowers[i].healthDisplay();
        if (myTowers[0].health <= 0) {
            myTowers.splice(i, 1);
            enemyCoins += 1000;
        }
    }
    for (i = 0; i < enemyTowers.length; i++) {
        enemyTowers[i].refresh();
        enemyTowers[i].healthDisplay();
        if (enemyTowers[i].health <= 0) {
            enemyTowers.splice(i, 1);
            coins += 1000;
        }
    }
}