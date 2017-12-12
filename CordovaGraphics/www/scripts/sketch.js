var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;

var canvas;
var ctx;

var GAMESTATE_PLAYING = 0;
var GAMESTATE_LOST = 1;
var GAMESTATE_WON = 2;

var gameState = GAMESTATE_PLAYING;
var enemies= [];

window.onload = onAllAssetsLoaded;
document.write("<div id='loadingMessage'>Loading...</div>");

function onAllAssetsLoaded() {
    // hide the webpage loading message
    document.getElementById('loadingMessage').style.visibility = "hidden";

    /* associate the javascript canvas variable to the HTML canvas element  */
    canvas = document.getElementById("canvas");

    /* Assign a graphics context to the canvas, so that we can draw on it */
    ctx = canvas.getContext("2d");

    /* Give the canvas a width and height */
    /* The width and height are in canvas logical units */
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    //SetUp the enemy number
    for (var i = 0; i < 10; i++) {
        enemies[i] = new Enemy(i, Math.floor((Math.random() * CANVAS_WIDTH) + 20), 20);
    }
    renderCanvas();
}


function renderCanvas() {

   // if (gameState === GAMESTATE_PLAYING) {
        /* Draw on the canvas */
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, (CANVAS_WIDTH), (CANVAS_HEIGHT));
        drawPlayer();
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].drawEnemy();
        }
    //}
   /* else if (gameState === GAMESTATE_LOST) {
        ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "red";
        ctx.font = "100px Times Roman";
        ctx.fillText("YOU LOST", 30, 250);
    }*/
}