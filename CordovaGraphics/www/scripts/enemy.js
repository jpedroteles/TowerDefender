function Enemy(id,x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    var enemyWidth = 10;
    var enemyHeight = 20;
    var enemySpeed = 0.1; 
    var enemyNumber = 10;
    var enemyColour = "purple";
    var enemyInterval = null;

    // Drawing function for the enemies, start on the top of the screen
    this.drawEnemy = function(){
        ctx.fillStyle = enemyColour;
        ctx.fillRect(x, y, enemyWidth, enemyHeight);
    }    //Update enemies position    this.moveEnemy = function () {            y += enemySpeed;
            setInterval(renderCanvas, enemySpeed);    }}