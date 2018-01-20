function gameLogic() {
    this.toPlay = new Set();
    this.enemiesId = 0
    this.life = 100;
    this.playing = false;

    this.sendEnemies = function() {
        //console.log("let's fabric enemies");
        // Do more logic here
        var random = Math.random();

        if (random >0.70){
            enemies = this.createEnemiWave();
        } else if (random < 0.30) {
            enemies = this.createXRanEnemies( Math.floor(Math.random() * (20-1)) -1);
        } else {
            enemies = this.createXRanEnemies(1);
        }

        return enemies;  
    }

    this.readyToPlay = function(userId) {
        this.toPlay.add(userId);
        if (this.toPlay.size >= 2){ //for later 2
            this.playing = true;
            return true;
        }

        return false;
    }

    this.createEnemiWave = function() {
        var enemies = new Array();
        var gap = 500/15;
        var speed = Math.floor(Math.random() * (110 - 30)) + 30;
        for (var i = 0; i < 15; i++) {
            enemies[i] = [this.enemiesId, Math.floor(gap*i), 500, speed];
            this.enemiesId +=1;
        }
        return enemies;
    }

    this.createXRanEnemies = function(num) {
        var enemies = new Array();

        while (num > 0){
            enemies.push(this.createRandomEnemie());
            num -= 1;
        }
        return enemies;
    }

    this.createRandomEnemie = function() {
        var enemy = [this.enemiesId, (Math.random() * 500), 500, Math.floor(Math.random() * (110 - 30)) + 30];
        this.enemiesId += 1;

        return enemy;
    }

    this.areAllPlayerDead = function(userId){
        if (this.toPlay.has(userId)){
            this.toPlay.delete(userId);
        }
    
        return (this.toPlay.size <= 0);
    }

    this.isAPlayer = function(userId){
        return this.toPlay.has(userId);
    }
}

module.exports = gameLogic;