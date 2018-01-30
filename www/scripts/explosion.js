function Explosion(x) {
    this.explosionWidth = 70;
    this.explosionHeight = 70;
    this.x = x;
    this.y = player.y - this.explosionHeight;

    /* These four are ALWAYS needed */
    this.animationInterval = null;
    this.ANIMATION_SPEED = 15; // change to suit the animation speed in milliseconds. Smaller numbers give a faster animation */
    this.animationIsDisplayed = true;

    this.column = 0;
    this.row = 0;

    this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 8; // the number of rows and columns in the sprite
    this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 8; // the number of rows and columns in the sprite
    
    this.explosionImg = new Image();
    this.explosionImg.src = "images/boom3.png";

    this.SPRITE_WIDTH = 0;
    this.SPRITE_HEIGHT = 0;

    this.explosionSound = new Audio();
    this.explosionSound.src = 'music/DeathFlash1.mp3';

    this.startAnime();
}

Explosion.prototype.startAnime = function () {
    //console.log("startanime");
    this.animationIsDisplayed = true;
    if (playSound) {
        this.explosionSound.play();
    }
    this.animationInterval = setInterval(this.update.bind(this), this.ANIMATION_SPEED);
};

Explosion.prototype.stopAnime = function () {
    //console.log("stop");
    this.explosionSound.pause();
    this.animationIsDisplayed = false;
    clearInterval(this.animationInterval);
    this.animationInterval = null; // set to null when not running           
};

Explosion.prototype.update = function () {
    this.column++;

    if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE) {
        
        this.column = 0;
        this.row++;

        if (this.row >= this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE) {
            this.row = 0;
            this.stopAnime();
        }
    }   
};

Explosion.prototype.render = function () {
    this.SPRITE_WIDTH = (this.explosionImg.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
    this.SPRITE_HEIGHT = (this.explosionImg.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);

    //console.log(this.column * this.SPRITE_WIDTH + " " + this.row * this.SPRITE_WIDTH);

    if (this.animationIsDisplayed) {
        ctx.drawImage(this.explosionImg, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.explosionWidth, this.explosionHeight);// this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.explosionWidth, this.explosionHeight);
    }
};