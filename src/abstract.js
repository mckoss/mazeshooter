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

    storage.getDoc('test', {}, function (doc) {
        world = doc.blob.world;
        player = doc.blob.player;
    });
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
        arr[i] = '';
        for (var j = 0; j < 15; j++) {
            if (x + i < 0 || y + j < 0 || x + i > 14 || y + j > 14) {
                arr[i] += 'w';
            } else {
                arr[i] += world[x + i][y + j];
            }
        }
    }
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
    w[0][0] = 'u';
    world = w;
}

function updateWorld() {
    
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

// if block in front of player call break block
function punch() {
    
}

// check if player has bullets, update player.bullets, call breakBlock
function shoot() {

}

// award 10 bullets to player (5 %) award 100 bullets to player (.5%)
// alter world[][] to change appropriate 'b' to 's'
function breakBlock() {

    updateWorld();
}

function move(dir) {
    var needUpdate = false;
    switch (dir) {
    case 0:
        if (player.y > 0) {
            player.y--;
            needUpdate = true;
        }
        break;
    case 1:
        if (player.x < 99) {
            player.x++;
            needUpdate = true;
        }
        break;
    case 2:
        if (player.y < 99) {
            player.y++;
            needUpdate = true;
        }
        break;
    case 3:
        if (player.x > 0) {
            player.x--;
            needUpdate = true;
        }
        break;
    }
    if (needUpdate) {
        updateWorld();
    }
}
