var shotInterval = 500; // 1/2 second
var shotAnimationInterval = null;
var shotUpdateAnimationInterval = null;
var shotsImage = ["images/shots/Archer1.png", "images/shots/Archer2.png", "images/shots/Archer3.png", "images/shots/Archer4.png", "images/shots/Archer5.png", "images/shots/Archer6.png", "images/shots/Archer7.png", "images/shots/Archer8.png", "images/shots/Archer9.png"];
var archerImgChoose = 0;

function startAnimationTimerShot() {
    if (shotAnimationInterval === null && shotUpdateAnimationInterval === null) {
        shotAnimationInterval = setInterval(createShot, shotInterval);
    }
}

function stopAnimationTimerShot() {
    clearInterval(shotAnimationInterval);
    shotAnimationInterval = null;
}

function createShot() {
    var shot = new Shot(player.playerY, player.rotation);
    shots.push(shot);
}

function Shot(y, rot) {
    this.toDelete = false;

    this.shotWidth = canvas.width / 60;
    this.shotHeight = canvas.height / 25;

    this.startX = this.shotWidth / 2;
    this.x = canvas.width / 2;
    this.y = y;

    this.speed = 5;
    this.incX = Math.sin(rot * Math.PI / 180) * this.speed;
    this.incY = Math.cos(rot * Math.PI / 180) * this.speed;

    this.rotation = rot;

    this.shotImg = new Image();
    this.shotImg.src = shotsImage[archerImgChoose];
}

// it is good coding practice to only include draw code inside draw functions
// and to not include drawing code anywhere else
Shot.prototype.drawShot = function () {

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.drawImage(this.shotImg, -this.startX, 0, this.shotWidth, this.shotHeight);

    ctx.restore();

};

Shot.prototype.move = function () {
    this.x -= this.incX;
    this.y += this.incY;

    if (this.x > canvas.width || this.x < 0 ||
        this.y > canvas.height || this.y < 0) {

        this.toDelete = true;
    }
};

Shot.prototype.hit = function (enemy) {
    if ((this.x - this.startX < enemy.x + enemy.enemyWidth - enemy.borderImage) && (this.x + this.startX > enemy.x + enemy.borderImage)
        && (this.y - this.shotHeight < enemy.y + enemy.enemyHeight) && (this.y > enemy.y)) {
        this.toDelete = true;
        return true;
    }
    else
        return false;
};

function archerImgChange(num) {
    archerImgChoose += num;

    var myarcher = document.getElementsByClassName("myArcher");

    if (archerImgChoose >= myarcher.length) {
        archerImgChoose = 0;
    }

    if (archerImgChoose < 0) {
        archerImgChoose = myarcher.length - 1;
    }

    for (var i = 0; i < myarcher.length; i++) {
        if (archerImgChoose === i) {
            myarcher[i].style.display = "block";
        } else {
            myarcher[i].style.display = "none";
        }
    }
}