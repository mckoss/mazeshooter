var clientLib = require('com.pageforest.client');
var ms = require('com.pageforest.mazeshooter.abstract');

exports.extend({
    'main': main,
    'drawWorld': drawWorld,
    'onUpdate': onUpdate,
    'getDocid': getDocid,
    'buyBullets': buyBullets
})

function getDocid() {
    if (client.username) {
        return client.username;
    }
}

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

function onKeyDown(e) {
    console.log("keydown");
    console.log("this keycode:" + e.keyCode);
    switch (e.keyCode)
    {
    case 37: //left
        event.preventDefault();
        ms.move(3);
        break;
    case 38: //up
        event.preventDefault();
        ms.move(0);
        break;
    case 39: //right
        event.preventDefault();
        ms.move(1);
        break;
    case 40: //down
        event.preventDefault();
        ms.move(2);
        break;
    case 32: //space - shoot
        event.preventDefault();
        ms.shoot();
        break;
    case 68: //d - shoot
        event.preventDefault();
        ms.shoot();
        break;
    case 70: //f - punch
        event.preventDefault();
        ms.punch();
    default:
    }
    drawWorld();
}


function drawWorld() {
    var tilesize = 24; 
    var canvas = document.getElementById('canvasWorld');
    canvas.width = canvas.width;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect (0, 0, 360, 360);
    var dir = ms.getPlayerInfo().dir;
    var map = ms.getLocalRegion();
    for (var i = 0; i < 15; i++) {
        for(var j = 0; j < 15; j++) {
            var line = map[i];
            if (line.charAt(j) == "u") {
                ctx.fillStyle = "rgb(0, 200, 0)";
            } else if(line.charAt(j) == "w") {
                ctx.fillStyle = "rgb(50, 0, 0)";
            } else if (line.charAt(j) == "b") {
                ctx.fillStyle = "rgb(0, 0, 200)";
            } else {
                ctx.fillStyle = "rgb(255, 255, 255)";
            }
        ctx.fillRect (j * tilesize, i*tilesize,
                     (j+1)*tilesize, (i+1)*tilesize);
        
        if(line.charAt(j) == "u" || 
           line.charAt(j) == "r" || 
           line.charAt(j) == "m"){
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
            }
        }
    }
    console.log(map);



}


function buyBullets() {
  goog.payments.inapp.buy({
    'jwt'     :     "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMTY4MTE1NjE0MDU5N" + 
               "Tk1NDQ0MCIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9" + 
               "wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxMzEyODQ2N" + 
               "DAwLCJleHAiOjEzMTI5MzI4MDAsInJlcXVlc3QiOnsiY3VycmV" + 
               "uY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIwLjk5IiwibmFtZSI6I" + 
               "kJ1Y2tldC1vLUJ1bGxldHMiLCJzZWxsZXJEYXRhIjoiMTAwIiw" + 
               "iZGVzY3JpcHRpb24iOiJMb2FkIHVwIHlvdXIgbWFnYXppbmUgZ" + 
               "m9yIE1pbmVTaG9vdGVyIn19.lyoZZ1U6Y6BYVJpAJ8M2XEKqIk" + 
               "G1s1lNz7HQjoi-Jp4",
    'success' : onBulletPurchase,
    'failure' : function () {
        alert("Your purchase failed");
    }
  });
}

//Success handler
function onBulletPurchase(purchaseAction) {
    alert("Purchase success!");
}
