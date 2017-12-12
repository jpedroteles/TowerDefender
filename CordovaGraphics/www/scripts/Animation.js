/*
var canvas;
var ctx;
var animationInterval = null; // set to null when not running
var STEP_SIZE = 1;
var NUMBER_OF_FRAMES_PER_SECOND = 25;
var SPEED = 1000 / NUMBER_OF_FRAMES_PER_SECOND;
var x, y;
var img = new Image();
img.src = "images/dkit02.gif";

//document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded() {
    // hide the webpage loading message
    //document.getElementById('loadingMessage').style.visibility = "hidden";

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    renderCanvas();

    startAnimationTimer();
}

function timer() {
    var sec = 0;
    function pad(val) { return val > 9 ? val : "0" + val; }
    setInterval(function () {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000);
}

function startAnimationTimer() {
    if (animationInterval === null) {
        x = Math.random()*(canvas.width - 20);
        y = 0;
        animationInterval = setInterval(renderCanvas, SPEED);
    }
}


function renderCanvas() {
    // clear any previous animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // test to see if all of the frames have been played
    if (y > (canvas.height + 1)) {
        clearInterval(animationInterval);
        animationInterval = null; // set to null when not running



        //spawn a random number os enemies
        x = Math.round(Math.abs(t / 10) * Math.abs(20 * Math.sin(t)));


        //create a enemy
        startAnimationTimer();
    }
    else // render the current frame and increment currentFrame
    {
        // render currentFrame
        ctx.fillRect(x, y, 20, 20);

        // increment the currentFrame
        y += STEP_SIZE;
    }
}

*/