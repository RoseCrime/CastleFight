function pvp() {

    for (i = 0; i < myCircles.length; i++) {
        myCircles[i].keepMoving();
        myCircles[i].resetTarget();
        stroke(0, 255, 100);
        if (enemyTowers[0] && abs(myCircles[i].x - enemyTowers[0].x) <= myCircles[i].range) {
            myCircles[i].closestEnemy = enemyTowers[0];
            myCircles[i].attack();
            myCircles[i].dealDamage();
        }

        for (j = 0; j < enemyCircles.length; j++) {
            myCircles[i].min = abs(myCircles[i].x - enemyCircles[j].x)
            if (myCircles[i].min < myCircles[i].minDist) {
                myCircles[i].minDist = myCircles[i].min;
                myCircles[i].closestEnemy = enemyCircles[j];
                if (myCircles[i].minDist <= myCircles[i].range) {
                    myCircles[i].attack();
                    myCircles[i].dealDamage();
                }
                if (enemyCircles[j].health <= 0) {
                    myCircles[i].keepMoving();
                    enemyCircles.splice(j, 1);
                    myCircles[i].closestEnemy = 0;
                    coins += 100;
                }
            }
        }

        if (!myCircles[i].closestEnemy && abs(myCircles[i].x - castle2.x) <= myCircles[i].range) {
            myCircles[i].closestEnemy = castle2;
            myCircles[i].attack();
            myCircles[i].dealDamage();
        }
    }

    for (j = 0; j < enemyCircles.length; j++) {
        enemyCircles[j].resetTarget();
        enemyCircles[j].keepMoving();
        stroke(255, 0, 100);
        if (myTowers[0] && abs(enemyCircles[j].x - myTowers[0].x) <= enemyCircles[j].range) {
            enemyCircles[j].closestEnemy = myTowers[0];
            enemyCircles[j].attack();
            enemyCircles[j].dealDamage();
        }

        for (i = 0; i < myCircles.length; i++) {
            enemyCircles[j].min = abs(enemyCircles[j].x - myCircles[i].x)
            if (enemyCircles[j].min < enemyCircles[j].minDist) {
                enemyCircles[j].minDist = enemyCircles[j].min;
                enemyCircles[j].closestEnemy = myCircles[i];
                if (enemyCircles[j].minDist <= enemyCircles[j].range) {
                    enemyCircles[j].attack();
                    enemyCircles[j].dealDamage();
                }
                if (myCircles[i].health <= 0) {
                    enemyCircles[j].keepMoving();
                    myCircles.splice(i, 1);
                    enemyCircles[j].closestEnemy = 0;
                    enemyCoins+= 100;
                }
            }
        }
        if (!enemyCircles[j].closestEnemy && abs(enemyCircles[j].x - castle1.x) <= enemyCircles[j].range) {
            enemyCircles[j].closestEnemy = castle1;
            enemyCircles[j].attack();
            enemyCircles[j].dealDamage();
        }
    }
}

function towerfight() {

    for (i = 0; i < myTowers.length; i++) {
        stroke(0);
        for (j = 0; j < enemyCircles.length; j++) {
            if (myTowers[i] && enemyCircles[j]) {
                myTowers[i].min = abs(myTowers[i].x - enemyCircles[j].x)
                if (myTowers[i].min < myTowers[i].minDist) {
                    myTowers[i].minDist = myTowers[i].min;
                    myTowers[i].closestEnemy = enemyCircles[j];

                    if (enemyCircles[j].health <= 0) {
                        enemyCircles.splice(j, 1);
                        coins += 100;
                    }
                }
            }
        }
        if (myTowers[i].closestEnemy) {
            if (myTowers[i].minDist <= myTowers[i].range) {

                if (myTowers[i].closestEnemy) {
                    myTowers[i].dealDamage();
                    myTowers[i].resetTarget();
                }
            }
        }
    }
    for (i = 0; i < enemyTowers.length; i++) {
        stroke(0);
        for (j = 0; j < myCircles.length; j++) {
            if (enemyTowers[i] && myCircles[j]) {
                enemyTowers[i].min = abs(enemyTowers[i].x - myCircles[j].x)
                if (enemyTowers[i].min < enemyTowers[i].minDist) {
                    enemyTowers[i].minDist = enemyTowers[i].min;
                    enemyTowers[i].closestEnemy = myCircles[j];

                    if (myCircles[j].health <= 0) {
                        myCircles.splice(j, 1);
                        enemyCoins += 100;
                    }
                }
            }
        }
        if (enemyTowers[i].closestEnemy) {
            if (enemyTowers[i].minDist <= enemyTowers[i].range) {

                if (enemyTowers[i].closestEnemy) {
                    enemyTowers[i].dealDamage();
                    enemyTowers[i].resetTarget();
                }
            }
        }
    }
}