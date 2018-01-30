var playSound = true;
var playAfterResume = false;

// music
var gameSound = document.createElement('audio');
gameSound.src = 'music/adventuring_song.mp3';
gameSound.loop = true;
var menuSound = document.createElement('audio');
menuSound.src = 'music/sketch4.mp3';
menuSound.loop = true;
var waitSound = document.createElement('audio');
waitSound.src = 'music/glitch.mp3';
waitSound.loop = true;

function startSound() {
    playSound = true;

    if (gameState === GAMESTATE_PLAYING) {
        gameSound.play();
    }

    if (gameState === GAMESTATE_LOST) {
        menuSound.play();
    }

    if (gameState === GAMESTATE_WAIT) {
        waitSound.play();
    }
}

function muteSound() {
    playSound = false;

    menuSound.pause();
    gameSound.pause();
    waitSound.pause();
    for (var i = 0; i < explosions.length; i++) {
        explosions[i].explosionSound.pause();
    }
}