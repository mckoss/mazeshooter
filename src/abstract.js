
var world;
var player;
var ui;
var client;
var storage;
var SIZE = 100;

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
var player;
var ui;
var client;
var storage;

var WORLD_DOC = '_world';
var WORLD_BLOB = 'world';
var UPDATE_BLOB = 'updates';

function init(c, userInterface) {
    client = c;
    storage = client.storage;
    ui = userInterface;
    
    storage.subscribe(WORLD_DOC, WORLD_BLOB, undefined, onWorldUpdate);

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
            if (x + i < 0 || y + j < 0 || x + i > SIZE - 1 || y + j > SIZE - 1) {
                arr[i] += 'w';
            } else {
                arr[i] += world[x + i][y + j];
            }
        }
    }
    return arr;
}

// strings do not let you edit by index, must slice
function setWorld(x, y, character) {
    world[y] = world[y].slice(0, x) + character + world.slice(x + 1);
}
function stringHelper(str, i, ch) {
    return str.slice(0, i) + ch + str.slice(i + 1);
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
    storage.push(WORLD_DOC, WORLD_BLOB, {
        username: client.username,
        world: world
        });
}

function onWorldUpdate() {
    console.log("onWorldUpdate");
}

function newPlayer() {
    var p = {};
    p.x = 0;
    p.y = 0;
    p.bullets = 1337;
    p.health = 1;
    p.dir = 2;
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
        switch(player.dir){
            case 2:
                bulletx=player.x;
                bullety=player.y;
                while(world[bulletx,bullety] ==' '){
                    bullety--;
                    if(world[bulletx,bullety] == 'b'){
                        breakBlock(bulletx,bullety);
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
