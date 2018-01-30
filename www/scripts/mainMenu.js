(function ($) {
    // define variables
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var canUseLocalStorage = 'localStorage' in window && window.localStorage !== null;
    var playSound;

    // set the sound preference
    if (canUseLocalStorage) {
        playSound = (localStorage.getItem('kandi.playSound') === "true");

        if (playSound) {
            $('.sound').addClass('sound-on').removeClass('sound-off');
        }
        else {
            $('.sound').addClass('sound-off').removeClass('sound-on');
        }
    }

    $('#main').show();
    $('#menu').addClass('main');
    $('.sound').show();

    /**
     * Click handlers for the different menu screens
     */
    $('.credits').click(function () {
        $('#main').hide();
        $('#credits').show();
        $('#menu').addClass('credits');
    });

    $('.back').click(function () {
        $('#credits').hide();
        $('#settings').hide();
        $('#highscores').hide();
        $('#beforeGame').hide();
        $('#main').show();
        $('#menu').removeClass('credits');
        $('#menu').removeClass('highscores');
        $('#menu').removeClass('beforeGame');
    });

    $('.sound').click(function () {
        var $this = $(this);
        // sound off
        if ($this.hasClass('sound-on')) {
            $this.removeClass('sound-on').addClass('sound-off');
            playSound = false;
        }
        // sound on
        else {
            $this.removeClass('sound-off').addClass('sound-on');
            playSound = true;
        }

        if (canUseLocalStorage) {
            localStorage.setItem('kandi.playSound', playSound);
        }

        // mute or unmute all sounds
        for (var sound in assetLoader.sounds) {
            if (assetLoader.sounds.hasOwnProperty(sound)) {
                assetLoader.sounds[sound].muted = !playSound;
            }
        }

    });

    $('.play').click(function () {
        $('#main').hide();
        $('#beforeGame').show();
        $('#menu').addClass('beforeGame');
    });

    $('.settings').click(function () {
        $('#main').hide();
        $('#settings').show();
        $('#menu').addClass('settings');
    });

    $('.highscores').click(function () {
        $('#main').hide();
        $('#highscores').show();
        $('#menu').addClass('highscores');
    });

})(jQuery);