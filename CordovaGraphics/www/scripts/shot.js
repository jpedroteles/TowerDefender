function Shot(y, rot) {
    this.toDelete = false;

    this.shotWidth = canvas.width / 100;
    this.shotHeight = canvas.height / 25;

    this.startX = this.shotWidth / 2;
    this.x = canvas.width / 2;
    this.y = y;

    this.speed = 5;
    this.incX = Math.sin(rot * Math.PI / 180) * this.speed;
    this.incY = Math.cos(rot * Math.PI / 180) * this.speed;

    this.rotation = rot;

    // it is good coding practice to only include draw code inside draw functions
    // and to not include drawing code anywhere else
    this.drawShot = function () {
        var playerColour = "green";

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.fillStyle = playerColour;
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillRect(-this.startX, 0, this.shotWidth, this.shotHeight);

        ctx.restore();

    };

    this.move = function () {
        this.x -= this.incX;
        this.y += this.incY;

        if (this.x > canvas.width || this.x < 0 ||
            this.y > canvas.height || this.y < 0) {

            this.toDelete = true;
        }
    };

    this.hit = function (enemy) {

        if ((this.x - this.startX < enemy.x + enemy.enemyWidth) && (this.x + this.startX > enemy.x)
            && ((this.y - this.shotHeight) < (enemy.y + enemy.enemyHeight)) && (this.y > enemy.y)) {
            this.toDelete = true;
            return true;
            // enemy should also be destroid
        }
        else
            return false;
    };
}