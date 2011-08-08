var clientLib = require('com.pageforest.client');
var ms = require('com.pageforest.abstract');

exports.extend({
    'main': main,
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

}

function drawWorld(worldArray) {

}

function onKeyDown() {
    
}
