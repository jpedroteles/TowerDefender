var enemyImagesBody = ["images/walkcycle/BODY_male.png"];
var enemySize = 50;

//weapons head hands belt shoulders torso legs feet
var clothes =
    [
        ["images/walkcycle/BEHIND_quiver", "images/walkcycle/WEAPON_shield_cutout_body"],
        ["images/walkcycle/HEAD_chain_armor_helmet", "images/walkcycle/HEAD_chain_armor_hood", "images/walkcycle/HEAD_hair_blonde", "images/walkcycle/HEAD_leather_armor_hat", "images/walkcycle/HEAD_plate_armor_helmet", "images/walkcycle/HEAD_robe_hood"],
        ["images/walkcycle/HANDS_plate_armor_gloves"],
        ["images/walkcycle/BELT_leather", "images/walkcycle/BELT_rope"],
        ["images/walkcycle/TORSO_leather_armor_bracers", "images/walkcycle/TORSO_leather_armor_shoulders", "images/walkcycle/TORSO_plate_armor_arms_shoulders"],
        ["images/walkcycle/TORSO_chain_armor_jacket_purple", "images/walkcycle/TORSO_chain_armor_torso", "images/walkcycle/TORSO_leather_armor_shirt_white", "images/walkcycle/TORSO_leather_armor_torso", "images/walkcycle/TORSO_plate_armor_torso", "images/walkcycle/TORSO_robe_shirt_brown"],
        ["images/walkcycle/LEGS_pants_greenish", "images/walkcycle/LEGS_plate_armor_pants", "images/walkcycle/LEGS_robe_skirt"],
        ["images/walkcycle/FEET_plate_armor_shoes", "images/walkcycle/FEET_shoes_brown"]        
    ];
var enemyImgChooseCloth = [-1, -1, -1, -1, -1, -1, -1, -1];
var imgFrontLoaded = [];
loadImgFront();

function addEnemy(enemies) {
    //console.log("Adding Enemies");
    // border of field: to not create an enemy to close from the walls
    var border = 20;

    for (var i = 0; i < enemies.length; i++) {
        // the 40 is enemy width if possible improve
        var gap = (canvas.width - (2 * border) - enemySize) / enemies[i][2];
        this.enemies.push(new Enemy(enemies[i][0], Math.floor(border + (enemies[i][1] * gap)), 0, enemies[i][3]));
    }
    //console.log("Enemies Received: " + enemies);
    //console.log("Total enemies: " + this.enemies);
}

function Enemy(id, x, y, animeSpeed) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.enemyWidth = enemySize;
    this.enemyHeight = enemySize;
    this.hp = 10;
    this.toDelete = false;
    this.enemySpeed = 1;

    /* These four are ALWAYS needed */
    this.animationInterval = null;
    this.ANIMATION_SPEED = animeSpeed; // change to suit the animation speed in milliseconds. Smaller numbers give a faster animation */
    this.animationIsDisplayed = false;

    this.column = 1;
    this.row = 2;

    this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 9; // the number of rows and columns in the sprite
    this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 4; // the number of rows and columns in the sprite

    this.borderImage = 10;
    this.enemyImageBody = new Image();
    this.enemyImageBody.src = enemyImagesBody[0];

    this.clothsImagesLoaded = [];
    for (var i = 0; i < enemyImgChooseCloth.length; i++) {
        if (enemyImgChooseCloth[i] !== -1) {
            this.clothsImagesLoaded.push(new Image());
            this.clothsImagesLoaded[this.clothsImagesLoaded.length - 1].src = clothes[i][enemyImgChooseCloth[i]] + ".png";
        }
    }

    this.SPRITE_WIDTH = 0;
    this.SPRITE_HEIGHT = 0;

    this.startAnime();
}

Enemy.prototype.drawEnemy = function () {
    this.render();
    //var enemyColour = "purple";
    //ctx.fillStyle = enemyColour;
    //ctx.fillRect(this.x, this.y, this.enemyWidth, this.enemyHeight);
};

Enemy.prototype.moveEnemy = function () {
    this.y += this.enemySpeed;
    //console.log("speed", enemySpeed);
    //console.log("enemy y", this.y, "player y", player.y);
    if (this.y > canvas.height || this.y < 0) {
        this.killAnime();
        this.toDelete = true;
    }
    else if (this.y >= player.y - this.enemyHeight) {
        //console.log("player hit");
        this.killAnime();
        this.toDelete = true;
        //console.log("boleano", this.toDelete);
    }
};

/* Public functions */
Enemy.prototype.startAnime = function () {
    //console.log("startanime");
    this.animationIsDisplayed = true;
    this.animationInterval = setInterval(this.update.bind(this), this.ANIMATION_SPEED);
};


Enemy.prototype.stopAnime = function () {
    this.animationIsDisplayed = false;
    clearInterval(this.animationInterval);
    this.animationInterval = null; // set to null when not running           
};


Enemy.prototype.killAnime = function () {
    //console.log("shot" + this.id);
    this.stopAnime();
    this.animationIsDisplayed = false;
};


Enemy.prototype.update = function () {
    this.moveEnemy();
    this.column++;

    if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE) {
        this.column = 1;
    }
};


Enemy.prototype.render = function () {
    this.SPRITE_WIDTH = (this.enemyImageBody.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
    this.SPRITE_HEIGHT = (this.enemyImageBody.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
    //console.log(this.SPRITE_WIDTH +" " + this.SPRITE_HEIGHT);
    if (this.animationIsDisplayed) {
        ctx.drawImage(this.enemyImageBody, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.enemyWidth, this.enemyHeight);

        for (var i = this.clothsImagesLoaded.length -1; i >= 0; i--){
            ctx.drawImage(this.clothsImagesLoaded[i], this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.x, this.y, this.enemyWidth, this.enemyHeight);
        }
    }
};

function loadImgFront() {
    for (var i = 0; i < clothes.length; i++) {
        imgFrontLoaded[i] = [];

        for (var j = 0; j < clothes[i].length; j++) {
            imgFrontLoaded[i].push(new Image());
            imgFrontLoaded[i][imgFrontLoaded[i].length-1].src = clothes[i][j] + "_front.png";
        }
    }
    console.log(imgFrontLoaded);
}

function enemyImgChange(num, pieceOfCloth) {
    enemyImgChooseCloth[pieceOfCloth] += num;

    if (enemyImgChooseCloth[pieceOfCloth] >= clothes[pieceOfCloth].length) {
        enemyImgChooseCloth[pieceOfCloth] = -1;
    }

    if (enemyImgChooseCloth[pieceOfCloth] < -1) {
        enemyImgChooseCloth[pieceOfCloth] = clothes[pieceOfCloth].length;
    }


    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 100;
    canvas.height = 100;
 
    for (var i = enemyImgChooseCloth.length-1; i >= 0; i--) {
        if (enemyImgChooseCloth[i] !== -1) {
            ctx.drawImage(imgFrontLoaded[i][enemyImgChooseCloth[i]], 0, 0, 100, 100);
        }
    }

    document.getElementsByClassName("imagesEnemy")[0].innerHTML = '<img class="myEnemy", src="' + canvas.toDataURL() +'">';
}