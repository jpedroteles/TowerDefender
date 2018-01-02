﻿function Enemy(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.enemyWidth = 10;
    this.enemyHeight = 20;
    var enemySpeed = 0.1;
    var enemyNumber = 10;

    this.drawEnemy = function () {
        // it is good coding practice to only include draw code inside draw functions
        // and to not include drawing code anywhere else
        // number in range of 1 to 100, where 100 is fastest
        var enemyColour = "purple";
        var enemyInterval = null;
        //console.log(id, x, y);
        ctx.fillStyle = enemyColour;
        ctx.fillRect(this.x, this.y, this.enemyWidth, this.enemyHeight);
    };

    this.moveEnemy = function () {
        this.y += enemySpeed;
        //console.log("speed", enemySpeed);
    };
}