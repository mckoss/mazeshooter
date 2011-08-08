// Scratch - a sample Pageforest Application
namespace.lookup('com.pageforest.scratch').defineOnce(function (exports) {
    var require = namespace.lookup;
    var clientLib = require('com.pageforest.client');

    exports['main'] = main;

    var client;
    var app;

    function Scratch() {
    }

    // Implement Pageforest Application inferface
    Scratch.methods({
        // Loading a document
        setDoc: function(json) {
            $('#blob').val(json.blob);
        },

        // Saving a document
        getDoc: function() {
            return {
                "blob": $('#blob').val()
            };
        },

        // Refresh links on the page
        onStateChange: function(newState, oldState) {
            var url = client.getDocURL();
            var link = $('#document');
            if (url) {
                link.attr('href', url + '?callback=document').show();
            }
            else {
                link.hide();
            }
            $('#mydocs').attr('href', 'http://' + client.wwwHost + '/docs/');
            $('#app-details').attr('href', 'http://' + client.wwwHost +
                                   '/apps/' + client.appid);
        }

    });

    function main() {
        handleAppCache();
        app = new Scratch();
        client = new clientLib.Client(app,
                                      {
                                          autoLoad: true
                                          //, oneDocPerUser: true
                                      });
        client.addAppBar();
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

});
