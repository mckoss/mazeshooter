exports.extend({
    'init': init,
    'move': move,
    'world': world,
    'getPlayerInfo': getPlayerInfo,
    'getLocalRegion': getLocalRegion,
    'shoot': shoot,
    'punch': punch
})

var world;  // array of strings
var storedWorld;
var player;
var ui;
var client;
var storage;
var SIZE = 100;

var WORLD_DOC = '_world';
var WORLD_BLOB = 'world';
var UPDATES_BLOB = 'updates';

var useMulti = false;

function init(c, userInterface) {
    client = c;
    storage = client.storage;
    ui = userInterface;
    
    if (useMulti) {
        storage.subscribe(WORLD_DOC, WORLD_BLOB, undefined, onRemoteUpdate);
        storage.getBlob(WORLD_DOC, WORLD_BLOB, undefined, function (result) {
            onRemoteUpdate(result);
        });
    }

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
    for (var j = 0; j < 15; j++) {
        arr[j] = '';
        for (var i = 0; i < 15; i++) {
            if (x + i < 0 || y + j < 0 || x + i > SIZE - 1 || y + j > SIZE - 1) {
                arr[j] += 'w';
            } else {
                arr[j] += getWorld(x + i, y + j);
            }
        }
    }
    return arr;
}

// strings do not let you edit by index, must slice
function setWorld(x, y, character) {
    world[y] = world[y].slice(0, x) + character + world[y].slice(x + 1);
}
function getWorld(x, y) {
    return world[y][x];
}

function makeWorld() {
    // 'b': block (breakable), 's': space
    var w = [];
    for (var i = 0; i < SIZE; i++) {
        w[i] = '';
        for (var j = 0; j < SIZE; j++) {
            w[i] += 'b';
        }
    }
    world = w;
    setWorld(0, 0, 'u');
}

function updateWorld() {
    ui.onUpdate();
    var diffs = diffWorld();
    if (diffs.length > 0) {
        storage.push(WORLD_DOC, UPDATES_BLOB, diffs);
    }
    if (diffs.length > 100) {
        var storing = copyWorld(world);
        storage.putBlob(WORLD_DOC, WORLD_BLOB, {world: world}, undefined, function () {
            storedWorld = storing;
        });
    }
}

function diffWorld() {
    var diffs = [];
    if (!storedWorld) {
        return diffs;
    }
    for (var y = 0; y < SIZE; y++) {
        for (var x = 0; x < SIZE; x++) {
            if (storedWorld[y][x] != world[y][x]) {
                diffs.push({ x: x, y: y, val: world[y][x] });
            }
        }
    }
    return diffs;
}

function copyWorld(w) {
    var copy = [];
    for (var y = 0; y < SIZE; y++) {
        copy[y] = w[y];
    }
}

function onRemoteUpdate(result) {
    world = result.world;
    storedWorld = result.world;
    updateWorld();
}

function newPlayer() {
    var p = {};
    p.x = 0;
    p.y = 0;
    p.bullets = 1337;
    p.health = 1;
    p.dir = 1;
    player = p;
}

// if block in front of player call break block
function punch() {
    
}

// check if player has bullets, update player.bullets, call breakBlock
function shoot() {
    if(player.bullets > 0)
    {
        player.bullets--;
        bulletx = player.x;
        bullety = player.y;
        switch(player.dir){
        case 1:
            while (getWorld(bulletx, bullety) == ' ' && bulletx < SIZE) {
                bulletx++;
                if (getWorld(bulletx, bullety) == 'b') {
                    breakBlock(bulletx, bullety);
                    break;
                }
            }
            break;
        case 3:
            while (getWorld(bulletx, bullety) == ' ' && bulletx > 0) {
                bulletx--;
                if (getWorld(bulletx, bullety) == 'b') {
                    breakBlock(bulletx,bullety);
                    break;
                }
            }
            break;
        case 0:
            while (getWorld(bulletx, bullety) == ' ' && bulletx > 0) {
                bullety--;
                if (getWorld(bulletx, bullety) == 'b') {
                    breakBlock(bulletx, bullety);
                    break;
                }
            }
            break;
        case 2:
            while (getWorld(bulletx, bullety) == ' ' && bulletx < SIZE) {
                bullety++;
                if (getWorld(bulletx, bullety) == 'b') {
                    breakBlock(bulletx, bullety);
                    break;
                }
            }
            break;
        }
    }
    else
    {
        console.log("get user to buy bullets");
    }    
    console.log(player.bullets);
    console.log("bullet end:"+bulletx+","+bullety);
    console.log(world[bulletx,bullety]);

}

// award 10 bullets to player (5 %) award 100 bullets to player (.5%)
// alter world[][] to change appropriate 'b' to 's'
function breakBlock(x, y) {
    setWorld(x, y, 's');
    updateWorld();
}

function move(dir) {
    var needUpdate = false;
    var x = player.x;
    var y = player.y;
    player.dir = dir;
    switch (dir) {
    case 0:
        if (player.y > 0) {
            player.y--;
            needUpdate = true;
        }
        break;
    case 1:
        if (player.x < SIZE - 1) {
            player.x++;
            needUpdate = true;
        }
        break;
    case 2:
        if (player.y < SIZE - 1) {
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
        setWorld(x, y, ' ');
        setWorld(player.x, player.y, 'u');
        updateWorld();
    }
}
