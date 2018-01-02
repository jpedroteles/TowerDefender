function Enemy(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.enemyWidth = 10;
    this.enemyHeight = 20;
    this.hp = 10;
    this.toDelete = false;
    var enemySpeed = 1;
    var enemyNumber = 10;

    this.drawEnemy = function () {
        var enemyColour = "purple";
        var enemyInterval = null;
        ctx.fillStyle = enemyColour;
        ctx.fillRect(this.x, this.y, this.enemyWidth, this.enemyHeight);
    };

    this.moveEnemy = function (player) {
        this.y += enemySpeed;
        console.log("speed", enemySpeed);
        console.log("enemy y", this.y, "player y", player.y);
        if (this.y > canvas.height || this.y < 0) {
            this.toDelete = true;
        }
       else if (this.y >= player.y) {
            console.log("player hit");
            this.toDelete = true;
            console.log("boleano", this.toDelete);
        }
    };

    this.destroy = function (attack) {
        this.life -= attack;
        this.toDelete = true;
    };
}