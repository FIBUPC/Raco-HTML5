(function() {
    'use strict';    
    
    require.config({
        paths: {
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