// Para uma introdução ao modelo em branco, consulte a seguinte documentação:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar códigos no carregamento de página em dispositivos/emuladores Android ou que simulam o Cordova: inicie o aplicativo, defina os pontos de interrupção 
// e execute "window.location.reload()" no Console do JavaScript.
(function ($) {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // define variables

        // Manipular eventos de pausa e retomada do Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: o Cordova foi carregado. Execute qualquer inicialização que exija o Cordova aqui.
    };

    function onPause() {
        // TODO: este aplicativo foi suspenso. Salve o estado do aplicativo aqui.
        if (gameState === GAMESTATE_PLAYING) {
            resetCanvas();
        }
        playAfterResume = playSound;
        muteSound();
    };

    function onResume() {
        // TODO: este aplicativo foi reativado. Restaure o estado do aplicativo aqui.
        if (gameState === GAMESTATE_PLAYING) {
            resetCanvas();
        }
        if (playAfterResume) {
            startSound();
        }        
    };

    $('#main').show();
    $('#menu').addClass('main');
    $('.sound').show();
    $('.sound').addClass('sound-on').removeClass('sound-off');

    menuSound.play();

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
            muteSound();
        }
        // sound on
        else {
            $this.removeClass('sound-off').addClass('sound-on');
            startSound();
        }
    });

    $('.quitGame').click(function () {
        var $this = $(this);
        
        resetCanvas();
        $('.quitGame').hide();
        $('#menu').show();
        $('#main').show();

        if (playSound) {
            waitSound.pause();
            gameSound.pause();
            menuSound.play();
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
        
        var myplayer = $('.myPlayer');
        
        for (var i = 0; i < myplayer.length; i++) {
            if (playerImgChoose === i) {
                myplayer[i].style.display = "block";
            } else {
                myplayer[i].style.display = "none";
            } 
        }

        var myarcher = $('.myArcher');

        for (i = 0; i < myarcher.length; i++) {
            if (archerImgChoose === i) {
                myarcher[i].style.display = "block";
            } else {
                myarcher[i].style.display = "none";
            }
        }

        var mybackground = $('.myBackground');

        for (i = 0; i < mybackground.length; i++) {
            if (backgroundImgChoose === i) {
                mybackground[i].style.display = "block";
            } else {
                mybackground[i].style.display = "none";
            }
        }

        var iplisthtml = $('.ip');
        for (i = 0; i <= iplisthtml.length-1; i++) {
            if (ipSelected === i) {
                iplisthtml[i].style.color = '#BB8944';
            } else {
                iplisthtml[i].style.color = '#ffffff';
            }
        }

        $('#menu').addClass('settings');
    });

    $('.highscores').click(function () {
        startServer();
        highScroresServer();
        $('#main').hide();
        $('#highscores').show();
        $('#menu').addClass('highscores');
    });

    $('.began').click(function () {
        $('#beforeGame').hide();
        $('#menu').hide();
        $('.quitGame').show();
        
        if (playSound) {
            menuSound.pause();
            waitSound.play();
        }

        startServer();
        onAllAssetsLoaded($('#namePlayer').val(), 0);
    });

    $('.addIP').click(function () {
        var newip = $('#newip').val();
            
        if (newip !== "") {
            ips.unshift(newip);
            ipSelected = 0;
            $('.ipList').prepend('<a href="javascript:void (0)" class="button ip">' + newip +'</a>');

            var iplisthtml = $('.ip');

            iplisthtml[0].style.color = '#BB8944';
            for (var i = 1; i <= iplisthtml.length-1; i++){
                iplisthtml[i].style.color = '#ffffff';
            }
        }
    });

    $('.removeIP').click(function () {
        if (ips.length > 1) {

            $('.ip')[ipSelected].remove();
            ips.splice(ipSelected, 1);

            if (ipSelected === ips.length) {
                ipSelected--;
            }

            var iplisthtml = $('.ip');
            iplisthtml[ipSelected].style.color = '#BB8944';
        }

    });

    $('.ipList').on('click', '.ip', function () {
        var iplisthtml = $('.ip');

        for (var i = 0; i < iplisthtml.length; i++) {
            console.log(this.innerText + " / " + iplisthtml[i].innerText);
            if (this.innerText === iplisthtml[i].innerText) {
                iplisthtml[ipSelected].style.color = '#ffffff';
                ipSelected = i;
                iplisthtml[i].style.color = '#BB8944';
            }
        }

    });

})(jQuery);