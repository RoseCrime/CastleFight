var finished = false;

function setup() {
    createCanvas(800, 300);
    rectMode(CENTER);
    textAlign(CENTER);
    textStyle(ITALIC);

    setupSketch();
    diffOptionsMaker();
}

function draw() {
    background(50, 150, 200);
    diffStage();
    gameStage();
}


function setupSketch() {
    setCoins();
    setCastles();
    towerMaker();
}

function gameStage() {
    if (difficulty) {
        castle1.refresh();
        castle1.healthDisplay();

        castle2.refresh();
        castle2.healthDisplay();

        towerRefresher();

        setPanels();

        EnemyCircleMaker();


        for (i = 0; i < myCircles.length; i++) {
            myCircles[i].visuals();
            myCircles[i].moveRight();
        }

        for (i = 0; i < enemyCircles.length; i++) {
            enemyCircles[i].visuals();
            enemyCircles[i].moveLeft();
        }
        gainMoney();
        pvp();
        towerfight();
        endGameStage();
    }
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
    gameStage();
}