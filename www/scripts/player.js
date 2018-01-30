var playersImage = ["images/Player/player1.png", "images/Player/player2.png", "images/Player/player3.png", "images/Player/player4.png", "images/Player/player5.png", "images/Player/player6.png"];
var playerImgChoose = 0;

function Player(life) {
    this.name = "";
    this.xp = 0;
    this.life = life;
    this.rotation = 180;
    this.score = 0;

    this.towerWidth = canvas.width; 
    this.towerHeight = canvas.height / 5;

    this.lifeBarWidthFull = canvas.width * 0.80;
    this.lifeBarWidthStepPerc = 1 / this.life;
    this.lifeBarHeight = canvas.height / 30;
    this.lifeBarX = canvas.width * 0.10;
    this.lifeBarY = canvas.height * 47 / 50;

    this.playerWidth = 10;
    this.playerHeight = 40;

    this.y = canvas.height - canvas.height / 5;

    this.startPlayerX = - this.playerWidth / 2;
    this.playerX = canvas.width / 2;
    this.playerY = this.y + this.playerHeight;    

    this.towerImg = new Image();
    this.towerImg.src = "images/castle.png";

    this.lifeBarImg = new Image();
    this.lifeBarImg.src = "images/LifeBar/bar.png";
    this.lifeBarImgEnergy = new Image();
    this.lifeBarImgEnergy.src = "images/LifeBar/bar2.png";
    this.playerImg = new Image();
    this.playerImg.src = playersImage[playerImgChoose];
}

/* public functions*/
Player.prototype.drawPlayer = function () {
    var towerColour = "black";
    var playerColour = "blue";
    var lifeBar = "red";

    // tower
    ctx.fillStyle = towerColour;
    ctx.drawImage(this.towerImg, 0, this.y, this.towerWidth, this.towerHeight);
    //ctx.fillRect(0, this.y, this.towerWidth, this.towerHeight);

    // life
    ctx.fillStyle = lifeBar;
    ctx.drawImage(this.lifeBarImg, this.lifeBarX, this.lifeBarY, this.lifeBarWidthFull, this.lifeBarHeight);

    ctx.drawImage(
        this.lifeBarImgEnergy,
        0,
        0,
        5 + (this.lifeBarImgEnergy.width - 10) * this.lifeBarWidthStepPerc * this.life,
        this.lifeBarImgEnergy.height,
        this.lifeBarX,
        this.lifeBarY,
        (1 - this.lifeBarWidthStepPerc * this.life) * (5 * this.lifeBarWidthFull) / this.lifeBarImg.width + this.lifeBarWidthFull * this.lifeBarWidthStepPerc * this.life,
        this.lifeBarHeight
    );
    //ctx.fillRect(this.lifeBarX, this.lifeBarY, this.lifeBarWidthStep * this.life, this.lifeBarHeight);

    // player
    ctx.save();

    ctx.translate(this.playerX, this.playerY);
    ctx.fillStyle = playerColour;
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.drawImage(this.playerImg, -this.playerImg.width / 2, 0, this.playerImg.width, this.playerHeight);
    //ctx.fillRect(this.startPlayerX, 0, this.playerWidth, this.playerHeight);

    ctx.restore();
};

Player.prototype.gotShot = function (attack) {
    this.life -= attack;

    if (this.life <= 0) {
        gameState = GAMESTATE_LOST;
    }
};

function playerImgChange(num) {
    playerImgChoose += num;

    var myplayer = document.getElementsByClassName("myPlayer");

    if (playerImgChoose >= myplayer.length) {
        playerImgChoose = 0;
    }

    if (playerImgChoose < 0) {
        playerImgChoose = myplayer.length - 1;
    }

    for (var i = 0; i < myplayer.length; i++) {
        if (playerImgChoose === i) {
            myplayer[i].style.display = "block";
        } else {
            myplayer[i].style.display = "none";
        }
    }
}