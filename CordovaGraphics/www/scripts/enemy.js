function Enemy(id,x, y) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.drawEnemy = function(){
        // it is good coding practice to only include draw code inside draw functions
        // and to not include drawing code anywhere else
        var enemyWidth = 10;
        var enemyHeight = 20;
        var enemySpeed = 10;    // number in range of 1 to 100, where 100 is fastest
        var enemyColour = "purple";
        var enemyInterval = null;
        console.log(id, x, y);
        ctx.fillStyle = enemyColour;
        ctx.fillRect(x, y, enemyWidth, enemyHeight);
    }    this.moveEnemy = function () {        y -= enemySpeed;
        if (y <= 0) {
            clearInterval(enemyInterval);
            enemyInterval = null;
        }
        setInterval(renderCanvas, SPEED);
    }}