var finished = false;
var difficulty;
var multiplier;

function setup() {
    createCanvas(800, 300);
    setupSketch();
}

function draw() {
    background(50, 150, 200);
    if (!difficulty) {
        choiseDiff();
    } else if (difficulty && multiplier) {
        drawSketch();
    }
}

function setupSketch() {
    setCoins();
    setCastles();
    towerMaker();
    strokeWeight(2);
    window.moneyInt = setInterval(gainMoney, 5000);
}

function drawSketch() {
    castle1.refresh();
    castle1.healthDisplay();
    diffPanel();
    castle2.refresh();
    castle2.healthDisplay();

    towerRefresher();
    panelRefresher();

    EnemyCircleMaker(castle2);


    for (i = 0; i < myCircles.length; i++) {
        myCircles[i].visuals();
        myCircles[i].moveRight();
    }

    for (i = 0; i < enemyCircles.length; i++) {
        enemyCircles[i].visuals();
        enemyCircles[i].moveLeft();
    }
    pvp();
    towerfight();
    gameEnded();
}


function stop() {
    //goes into interface gameEnd function;
    for (i = 0; i < myCircles.length; i++) {
        myCircles[i].damage = 0;
        myCircles[i].speed = 0;
    }
    for (i = 0; i < enemyCircles.length; i++) {
        enemyCircles[i].damage = 0;
        enemyCircles[i].speed = 0;
    }
    income = 0;
    clearInterval(moneyInt);
}

function reset() {
    myTowers = [];
    enemyTowers = [];
    myCircles = [];
    enemyCircles = [];
    castle1 = null;
    castle2 = null;
    finished = false;
    setupSketch();
    drawSketch();
}
