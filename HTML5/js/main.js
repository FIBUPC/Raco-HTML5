(function () {
    'use strict';    
    
    require.config({
        /*shim: {
            'underscore': {
                deps: ['jquery'], //dependencies
                exports: '_' //the exported symbol
            },
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        },*/
        paths: {
            /*jquery: 'libraries/vendor/jquery',
            underscore: 'libraries/vendor/underscore',
            backbone: 'libraries/vendor/backbone',*/
            text: 'libraries/vendor/text'
        }
    });

    require(['app'], function(app) {
        app.init();
    });
}());