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
    return player;
}

// returns 15x15 array 
function getLocalRegion() {
    var arr = [];
    var x = player.x - 7;
    var y = player.y - 7;
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (!world[x + i][y + j]) {
                arr[i] += 'w';
            } else {
                arr[i] += world[x + i][y + j];
            }
        }
    }
    arr = stringHelper(arr[7], 7, 'u');
    return arr;
}

function stringHelper(str, i, ch) {
    return str.slice(0,i) + ch + str.slice(i + 1);
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
    p.health = 1;
    p.dir = 2;
    player = p;
}

function punch() {
    
}

function shoot() {

}

function move(direction) {

    return false;
}
