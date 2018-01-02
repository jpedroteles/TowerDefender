var canvas;
var ctx;

var animationInterval = null; // set to null when not running
var STEP_SIZE = 1;
var NUMBER_OF_FRAMES_PER_SECOND = 25;
var SPEED = 1000 / NUMBER_OF_FRAMES_PER_SECOND;

var GAMESTATE_PLAYING = 0;
var GAMESTATE_LOST = 1;
var GAMESTATE_WON = 2;

var gameState = GAMESTATE_PLAYING;
var player;
var enemies = [];
var shots = [];
var startTime = new Date();

// images
var background = new Image();
background.src = "images/background.jpg";


//document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded() {
    // hide the webpage loading message
    // document.getElementById('loadingMessage').style.visibility = "hidden";

    /* associate the javascript canvas variable to the HTML canvas element  */
    canvas = document.getElementById("canvas");

    /* Assign a graphics context to the canvas, so that we can draw on it */
    ctx = canvas.getContext("2d");

    // set the with and height of the canvas corresponding to the screen to be played
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 7;

    // SetUp Player
    player = new Player(100);

    // SetUp the enemy number
    for (var i = 0; i < 10; i++) {
        enemies[i] = new Enemy(i, Math.floor((Math.random() * canvas.width) + 20), 20);
    }

    window.addEventListener('keydown', keydownHandler);
    renderCanvas();

    //startAnimationTimer();
}


function startAnimationTimer() {
    if (animationInterval === null) {
        animationInterval = setInterval(renderCanvas, SPEED);
    }
}


function renderCanvas() {
    /* Continuously call requestAnimationFrame() to keep rendering the canvas */
    if (gameState !== GAMESTATE_PLAYING) {
        return; // end recursion
    }
    else {
        requestAnimationFrame(renderCanvas); // recursively call next frame
    }

    // clear any previous animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // render Player
    player.drawPlayer();

    // test to see if all of the frames have been played
    if (gameState === GAMESTATE_PLAYING) {

        for (var i = 0; i < enemies.length; i++) {
            enemies[i].drawEnemy();
            enemies[i].moveEnemy(player);
            if (enemies[i].toDelete) {
                enemies.splice(i, 1);
                i--;
            }
        }

        for (i = 0; i < shots.length; i++) {
            shots[i].drawShot();
            shots[i].move();

            for (var j = 0; j < enemies.length; j++) {
                if (shots[i].hit(enemies[j])) {
                    enemies.splice(j, 1);
                    j--;
                }                
            }

            if (shots[i].toDelete) {
                shots.splice(i, 1);
                i--;
            }
        }

        //console.log(shots.length);
    }
    else 
    {   
        clearInterval(animationInterval);
        animationInterval = null; // set to null when not running
        //startAnimationTimer();
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "100px Times Roman";
        ctx.fillText("GAME OVER", 30, 250);

    }
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

        /*
        if (bulletInterval === null) {
            bulletX = batX + batWidth / 2;
            bulletY = batY;
            bulletFiring = true;

            bulletInterval = setInterval(moveBullet, 100 / bulletSpeed);  // animate bullet
        }*/
    }
}