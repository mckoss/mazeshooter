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
    drawWorld();
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

function onKeyDown() {
    console.log("keydown");
}


function drawWorld(worldArray) {
    var canvas = document.getElementById('canvasWorld');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect (0, 0, 360, 360);
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (30, 30, 55, 50);




    //console.log(ms.getLocalRegion());

}

