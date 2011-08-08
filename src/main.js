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
    var tilesize = 24; 
    var canvas = document.getElementById('canvasWorld');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect (0, 0, 360, 360);
    var dir = 3;
    var map = ms.getLocalRegion();
        console.log(map);
    for (var i = 0; i < 15; i++) {
        for(var j = 0; j < 15; j++) {
            var line = map[i];
            if (line.charAt(j) == "u") {
                ctx.fillStyle = "rgb(0, 200, 0)";
                ctx.fillRect (i * tilesize, j*tilesize,
                     (i+1)*tilesize, (j+1)*tilesize);
                //draw triangle indicating direction
                ctx.fillStyle = "rgb(0,0,0)";
                switch(dir) {
                    case 0:
                    ctx.moveTo(i*tilesize + 2, j*tilesize + 22);
                    ctx.lineTo(i*tilesize + 22, j*tilesize + 22);
                    ctx.lineTo(i*tilesize + 12, j*tilesize + 2);
                    ctx.lineTo(i*tilesize + 2, j*tilesize + 22);
                    break;
                    case 1:
                    ctx.moveTo(i*tilesize + 2, j*tilesize + 2);
                    ctx.lineTo(i*tilesize + 22, j*tilesize + 12);
                    ctx.lineTo(i*tilesize + 2, j*tilesize + 22);
                    ctx.lineTo(i*tilesize + 2, j*tilesize + 2);
                    break;
                    case 2:
                    ctx.moveTo(i*tilesize + 2, j*tilesize + 2);
                    ctx.lineTo(i*tilesize + 22, j*tilesize + 2);
                    ctx.lineTo(i*tilesize + 12, j*tilesize + 22);
                    ctx.lineTo(i*tilesize + 2, j*tilesize + 2);
                    break;
                    case 3:
                    ctx.moveTo(i*tilesize + 22, j*tilesize + 2);
                    ctx.lineTo(i*tilesize + 22, j*tilesize + 22);
                    ctx.lineTo(i*tilesize + 2, j*tilesize + 12);
                    ctx.lineTo(i*tilesize + 22, j*tilesize + 2);
                    break;
                    
                }
                ctx.fill();
                
                
            } else if(line.charAt(j) == "w") {
                ctx.fillStyle = "rgb(50, 0, 0)";
                ctx.fillRect (i * tilesize, j*tilesize,
                     (i+1)*tilesize, (j+1)*tilesize);
            } else if (line.charAt(j) == "b") {
                ctx.fillStyle = "rgb(0, 0, 200)";
                ctx.fillRect (i * tilesize, j*tilesize,
                     (i+1)*tilesize, (j+1)*tilesize);
            } else {
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.fillRect (i * tilesize, j*tilesize,
                     (i+1)*tilesize, (j+1)*tilesize);
            }
            
        }
    }




}

