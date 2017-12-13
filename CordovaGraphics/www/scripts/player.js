function Player(life) {
    this.life = life;
    this.rotation = 180;

    this.towerWidth = canvas.width; 
    this.towerHeight = canvas.height / 5;

    this.playerWidth = 10;
    this.playerHeight = 40;

    this.y = canvas.height - canvas.height / 5 + this.playerHeight;

    this.startPlayerX = - this.playerWidth / 2;
    this.playerX = canvas.width / 2;
    this.playerY = this.y + this.playerHeight;

    // it is good coding practice to only include draw code inside draw functions
    // and to not include drawing code anywhere else
    this.drawPlayer = function () {
        var towerColour = "black";
        var playerColour = "red";

        ctx.fillStyle = towerColour;
        ctx.fillRect(0, this.y, this.towerWidth, this.towerHeight);

        ctx.save();

        ctx.translate(this.playerX, this.playerY);
        ctx.fillStyle = playerColour;
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillRect(this.startPlayerX, 0, this.playerWidth, this.playerHeight);

        ctx.restore();
    };

    this.gotShot = function (attack) {
        this.life -= attack;

        if (this.life <= 0) {
            gameState = GAMESTATE_LOST;
        }
    };
    
}