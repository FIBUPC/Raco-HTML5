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
            templates: 'templates',
            text: 'libraries/vendor/text',
            jsOAuth: 'libraries/vendor/js-oauth'
        }
    });

    require(
        ['app'],
        function(app) {
            app.init();
        }
    );
}());