function setCoins() {
    coins = 400;
    enemyCoins = 400;
    income = 50;
    maxIncome = 500;
}

function gainMoney() {
    coins += income;
    enemyCoins += income;
    if (income <= maxIncome) {
        income += 5;
    }
}
