var world;
var player;
var ui;
var client;
var storage;

exports.extend({
    'init': init,
    'move': move,
    'world': world,
    'getPlayerInfo': getPlayerInfo,
    'getLocalRegion': getLocalRegion,
    'shoot': shoot,
    'punch': punch
})

function init(c, userInterface) {
    client = c;
    storage = client.storage;
    ui = userInterface;
    
    

    makeWorld();
    newPlayer();
}

function getPlayerInfo() {
    
}

// returns 15x15 array 
function getLocalRegion() {
    var arr = [];
    var x = player.x - 7;
    var y = player.y - 7;
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (world[x + i][y + j]) {
            }
        }
    }
}

function makeWorld() {
    var scale = 100;
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
    p.x = 0;
    p.y = 0;
    p.bullets = 0;
    p.hp = 1;
    player = p;
}

function punch() {

}

function shoot() {

}

function move(direction) {
    if (isValidMove(loc)) {
        p.loc = loc;
    }
    return false;
}
