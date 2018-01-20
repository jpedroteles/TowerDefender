var canvas;
var ctx;

var GAMESTATE_PLAYING = 0;
var GAMESTATE_LOST = 1;
var GAMESTATE_WAIT = 2;

var gameState = GAMESTATE_LOST;
var player;
var enemies = [];
var shots = [];
var otherPlayerShots = [];
var explosions = [];
var startTime = null;
var onServerDown = null;

// images
var trophy = new Image();
trophy.src = "images/golden_trophy.png";
var wait = new Image();
wait.src = "images/wait.png";

//document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded(name, xp) {
    console.log("Canvas in: ");
    // hide the webpage loading message
    // document.getElementById('loadingMessage').style.visibility = "hidden";

    /* associate the javascript canvas variable to the HTML canvas element  */
    canvas = document.getElementById("canvas");

    /* Assign a graphics context to the canvas, so that we can draw on it */
    ctx = canvas.getContext("2d");

    // set the with and height of the canvas corresponding to the screen to be played
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // SetUp Background
    background = new Image();
    background.src = "images/background/battleback" + backgroundImgChoose + ".png";

    // SetUp Player
    player = new Player(100);
    player.name = name;
    player.xp = xp;

    // SetUp Shots sent by keyboard
    startTime = new Date();

    // Events
    window.addEventListener('keydown', keydownHandler);
    //canvas.addEventListener('click', clickHandler);

    // Accelerometer
    var optionAccel = { frequency: 40 };  // Update every 3 seconds
    var watchAcce = navigator.accelerometer.watchAcceleration(accelSuccess, accelError, optionAccel);

    // StartGameServer
    gameState = GAMESTATE_WAIT;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(wait, canvas.width * 0.15, (canvas.height - canvas.width * 0.7) / 2, canvas.width * 0.7, canvas.width * 0.7);

    playServer();
}

function startCanvas() {    
    gameState = GAMESTATE_PLAYING;

    //Start Shots keyboard
    startTime = new Date();

    //Start Shots
    startAnimationTimerShot();

    renderCanvas();
}

function renderCanvas() {
    //console.log("render canvas");
    /* Continuously call requestAnimationFrame() to keep rendering the canvas */
    if (gameState === GAMESTATE_LOST) {

        gameOver();
        return; // end recursion
    }
    else {
        requestAnimationFrame(renderCanvas); // recursively call next frame
    }

    // clear any previous animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render background and bottons
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // render Player
    player.drawPlayer();  

    // test to see if all of the frames have been played
    if (gameState === GAMESTATE_PLAYING) {

        // render enemies
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].drawEnemy();
            //enemies[i].moveEnemy(player);
            if (enemies[i].toDelete) {
                player.gotShot(5);

                explosions.push(new Explosion(enemies[i].x));

                enemies[i].killAnime();
                enemies.splice(i, 1);
                i--;
            }
        }     

        // render shots
        for (i = 0; i < shots.length; i++) {
            shots[i].move(i);
            shots[i].drawShot();

            for (var j = 0; j < enemies.length; j++) {
                if (shots[i].hit(enemies[j])) {
                    this.player.score += 10;
                    enemyKilledServer(enemies[j].id);
                 
                    enemies[j].killAnime();
                    enemies.splice(j, 1);
                    j--;
                    break;
                }
            }

            if (shots[i].toDelete) {
                shots.splice(i, 1);
                i--;
            }
        }

        // render explosions
        for (i = 0; i < explosions.length; i++){

            if (explosions[i].animationIsDisplayed) {
                explosions[i].render();
            } else {
                explosions.splice(i, 1);
                i--;
            }
        }

        //console.log(shots.length);
    }
    else if (gameState === GAMESTATE_WAIT)
    {   
        // render trophy
        ctx.drawImage(wait, canvas.width * 0.15, (canvas.height - canvas.width * 0.7) / 2, canvas.width * 0.7, canvas.width * 0.7);

    }

    // Score
    ctx.font = "25px Impact";
    ctx.fillStyle = "Black";
    var scoretowrite = "score: " + this.player.score;
    ctx.fillText(scoretowrite, canvas.width * 0.3, canvas.height * 0.06);
}

function manualPlay() {
    // SetUp the enemy number
    for (var i = 0; i < 10; i++) {
        enemies[i] = new Enemy(i, Math.floor((Math.random() * (canvas.width - 40)) + 20), 20, 100);
    }
    startCanvas();
}

// Get the Acceleration Success
function accelSuccess(acceleration) {
    player.rotation = 180 + acceleration.x * 9;
}

// Get the Acceleration Error
function accelError() {
    alert('onError!');
}

function resetCanvas() {
    gameState = GAMESTATE_LOST;

    playerDiedServer();
    startTime = null;

    // player 
    this.playe = null;

    // shots
    stopAnimationTimerShot();
    this.shots = [];


    // enemies
    for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].killAnime();
    }
    this.enemies = [];

    // explosions
    for (i = 0; i < this.explosions.length; i++) {
        this.explosions[i].stopAnime();
    }
    this.explosions = [];
}

function gameOver() {
    // stop shots animation
    stopAnimationTimerShot();

    // clear any previous animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render background and bottons
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // render trophy
    var trophySize = canvas.width * 0.7;
    var trophyX = canvas.width * 0.15;
    var trophyY = (canvas.height - trophySize) / 2;
    ctx.drawImage(trophy, trophyX, trophyY, trophySize, trophySize);

    // render score
    ctx.font = "30px Courier New Bold Italic";
    ctx.fillText("FINAL SCORE", trophyX + trophySize * 0.3, trophyY + trophySize * 0.30, trophySize * 0.4);
    ctx.strokeText("FINAL SCORE", trophyX + trophySize * 0.3, trophyY + trophySize * 0.30, trophySize * 0.4);

    ctx.fillText(this.player.score, trophyX + trophySize * 0.4, trophyY + trophySize * 0.5, trophySize * 0.2);
}

function keydownHandler(e) {
    var speed = 1;

    if (e.keyCode === 37)  // left
    {
        if (player.rotation >= 105) {
            player.rotation -= speed;
        }
    }
    else if (e.keyCode === 39) // right
    {
        if (player.rotation <= 255) {
            player.rotation += speed;
        }
    }
    else if (e.keyCode === 32) // space
    {
        console.log("space");

        var endTime = new Date();
        var timeDiff = endTime - startTime;

        // strip the ms
        timeDiff /= 1000;

        // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
        var seconds = Math.round(timeDiff % 60);

        if (seconds >= 1) {
            startTime = endTime;
            var shot = new Shot(player.playerY, player.rotation);
            shots.push(shot);
        }
    }
}
