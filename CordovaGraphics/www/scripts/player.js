
  
function drawPlayer() {
    var playerX = 200;
    var playerY = 490;
    var playerWidth = 100;
    var playerHeight = 10;
    var playerSpeed = 10;    // number in range of 1 to 100, where 100 is fastest
    var playerColour = "white";
        // it is good coding practice to only include draw code inside draw functions
        // and to not include drawing code anywhere else
        ctx.fillStyle = playerColour;
        ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }

    function setPlayerY(y) {
        playerY = y;
    }