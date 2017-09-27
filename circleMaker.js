var clicked;
var myCircles = [];
var enemyCircles = [];
var options = ['Tank', 'DD', 'Ranged', 'Mix'];
this.moves = true;
this.attacks = false;

this.min = 0;
this.minDist = 500;
this.closestEnemy = undefined;

function circleMaker(mouseX, mouseY) {

    if (coins >= 150) {
        if (mouseX >= 25 && mouseX <= 25 + 40) {
            clicked = 'Tank';
            myCircles.push(new MakeCircle(clicked, castle1));

        } else if (mouseX >= 25 + 40 + 5 && mouseX <= 30 + 40 * 2) {
            clicked = 'DD';
            myCircles.push(new MakeCircle(clicked, castle1));

        } else if (mouseX >= 30 + 40 * 2 + 5 && mouseX <= 35 + 40 * 3) {
            clicked = 'Ranged';
            myCircles.push(new MakeCircle(clicked, castle1));

        } else if (mouseX >= 35 + 40 * 3 + 5 && mouseX <= 40 + 40 * 4) {
            clicked = 'Mix';
            myCircles.push(new MakeCircle(clicked, castle1));
        }
        coins -= 150;
    }
}


function MakeCircle(clicked, castle) {
    if (castle === castle2) {
        this.mult = multiplier;
    } else if (castle === castle1) {
        this.mult = 1;

    }

    this.x = castle.x;
    this.y = castle.y;

    if (clicked === 'Tank') {
        this.color = color(50, 100, 200);;
        this.health = 50000 * this.mult;
        this.damage = 5 * this.mult;
        this.range = 20;
        this.speed = 0.3 * this.mult;
    } else if (clicked === 'DD') {
        this.color = color(0, 255, 0);
        this.health = 3000 * this.mult;
        this.damage = 50 * this.mult;
        this.range = 75;
        this.speed = 3 * this.mult;
    } else if (clicked === 'Ranged') {
        this.color = color(255, 0, 0);
        this.health = 3500 * this.mult;
        this.damage = 5 * this.mult;
        this.range = 300;
        this.speed = 0.2 * this.mult;

    } else if (clicked === 'Mix') {
        this.color = color(255, 215, 0);
        this.health = 5000 * this.mult;
        this.damage = 15 * this.mult;
        this.range = 150;
        this.speed = 0.3 * this.mult;
    }

    this.visuals = function () {
        stroke(0);
        fill(this.color);
        ellipse(this.x, this.y, 15, 15);
    }

    this.moveRight = function () {
        if (this.moves === true)
            this.x += this.speed;
    }
    this.moveLeft = function () {
        if (this.moves === true)
            this.x -= this.speed;
    }

    this.resetTarget = function () {
        this.min = 0;
        this.minDist = 500;
        this.closestEnemy = undefined;
    }

    this.attack = function () {
        this.attacks = true;
        this.moves = false;

    }
    this.keepMoving = function () {
        this.moves = true;
        this.attacks = false;
    }
    this.dealDamage = function () {
        if (this.closestEnemy) {
            line(this.x, this.y, this.closestEnemy.x, this.closestEnemy.y);
            this.closestEnemy.health = this.closestEnemy.health - this.damage;
        } else
            this.keepMoving();
    }
}

function EnemyCircleMaker() {
    this.x = castle2.x + castle2.size;
    this.y = castle2.y + castle2.size / 2;
    if (difficulty != 'Impossible' && difficulty != 'Hard' && enemyCoins >= 150) {
        enemyCircles.push(new MakeCircle(random(options), castle2));
        enemyCoins -= 150;
    } else if (enemyCoins >= 100) {
        enemyCircles.push(new MakeCircle(random(options), castle2));
        enemyCoins -= 100;
    }
}
