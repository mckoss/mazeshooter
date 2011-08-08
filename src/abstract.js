
var world;
var player;

exports.extend({
    'init': init,
    'movePlayer': movePlayer,
    'world': world
})

function init(scale) {
    makeWorld(scale);
    newPlayer();
}

function makeWorld(scale) {
    // 'b': block (breakable), 's': space
    var w = [];
    for (var i = 0; i < scale + 2; i++) {
        w[i] = [];
        for (var j = 0; j < scale + 2; j++) {
            w[i][j] = 'b';
        }
    }
    w[0][0] = 's';
    world = w;
}

function newPlayer() {
    var p = {};
    p.loc = [0, 0];
    p.bullets = 0;
    p.hp = 1;
    player = p;
}

function movePlayer(loc) {
    if (isValidMove(loc)) {
        p.loc = loc;
    }
    return false;
}

function isValidMove(loc) {
    if (!(Math.abs(loc[0] - player.loc[0]) < 1 &&
         Math.abs(loc[1] - player.loc[1]) < 1)) {
        return false;
    }
    if (world[loc[0]][loc[1]] != 's') {
        return false;
    }
    return true;
}