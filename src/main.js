var clientLib = require('com.pageforest.client');
var ms = require('com.pageforest.mazeshooter.abstract');

exports.extend({
    'main': main,
    'drawWorld': drawWorld,
    'onUpdate': onUpdate
})

var client;
var app = {
    // Loading a document
    setDoc: function(json) {
        $('#blob').val(json.blob);
    },

    // Saving a document
    getDoc: function() {
        return {
            "blob": $('#blob').val()
        };
    }
};

function main() {
    handleAppCache();
    client = new clientLib.Client(app);
    client.addAppBar();
    ms.init(client, exports);
    
    $(window).bind('keydown', onKeyDown);
}

// For offline - capable applications
function handleAppCache() {
    if (typeof applicationCache == 'undefined') {
        return;
    }

    if (applicationCache.status == applicationCache.UPDATEREADY) {
        applicationCache.swapCache();
        location.reload();
        return;
    }

    applicationCache.addEventListener('updateready', handleAppCache, false);
}

function onUpdate() {
    console.log("onUpdate");

}

function onKeyDown(e) {
    console.log("keydown");
    console.log("this keycode:" + e.keyCode);
    switch (e.keyCode)
    {
    case 37: //left
        ms.move(3);
        break;
    case 38: //up
        ms.move(0);
        break;
    case 39: //right
        ms.move(1);
        break;
    case 40: //down
        ms.move(2);
        break;
    case 32: //space - shoot
        ms.shoot();
        break;
    case 68: //d - shoot
        ms.shoot();
        break;
    case 70: //f - punch
        ms.punch();
    default:
    }        
}

function drawWorld(worldArray) {
    alert("drawWorld");
}

