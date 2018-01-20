var socket = null;
var io = null;
var serverOn = false;
var ips = ["10.5.186.163", "212.191.70.213"];
var ipSelected = 0;
var minTime = 1500;

function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
};

function startServer() {
    console.log("IP start: " + ips[ipSelected]);
    socket = io('http://' + ips[ipSelected] + ':3000');

    serverOn = false;
    socket.emit('connected', 'connected');

    socket.on('test', function (msg) {
        console.log("It's working" + JSON.stringify(msg));
    });

    socket.on('Connected', function (msg) {
        serverOn = true;
        console.log("connected to server");
    });

    socket.on('Play', function () {
        console.log("entered here");
        socket.emit('ready');
        keepscreenon.enable();

        if (playSound) {
            waitSound.pause();
            gameSound.play();
        }

        startCanvas();   
    });

    socket.on('SendEnemy', function (data) {
        if (gameState === GAMESTATE_PLAYING) {
            addEnemy(data);

            if (minTime >= 100) {
                minTime -= 1;
            }
            
            var time = Math.floor(Math.random() * (3000 - minTime)) + minTime ;
            setTimeout(function (socket) {
                //add more logic
                socket.emit('sendEnemy');
            }, time, socket);
        }
    });

    socket.on('EnemyKilled', function (data) {
        //console.log("Enemies Killed " + data);
        if (gameState === GAMESTATE_PLAYING) {
                 
            var result = enemies.filter(function (val) {
                return val.id === data;
            });

            if (result.length > 0) {
                enemies.splice(enemies.indexOf(result[0]), 1);
            }
        }
    });
                
    socket.on('Highscores', function (data) {
        console.log('highscore');
        console.log(data);
        highScreTableUpdate(data);
        socket.close();
    });

    socket.on('disconnect', function (data) {
        socket.close();
        console.log("disconnected from server");
    });
}

function playServer() {
    socket.emit('play', { name: player.name, xp: player.xp });
}

function enemyKilledServer(enemieId) {
    socket.emit('enemyKilled', enemieId);
}

function playerDiedServer() {
    socket.emit('lost', this.player.score);
}

function highScroresServer() {
    socket.emit('highscore');
}

function highScreTableUpdate(data) {
    var tablecontentnew = '';
    for (var i = 0; i < data.length; i++) {
        tablecontentnew += '<tr> <td>' + data[i].UserName + '</td>';
        tablecontentnew += '<td>' + data[i].Score + '</td> </tr>';
    }    

    document.getElementsByClassName("tbodyhc")[0].innerHTML = tablecontentnew;
}