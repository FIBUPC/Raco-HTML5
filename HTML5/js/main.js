(function() {
    'use strict';    
    
    require.config({
        paths: {
            templates: 'templates',
            text: (MobileDetector.isNativeApp() && MobileDetector.isWindowsPhone() ?
                'libraries/platform/windowsphone/text' : 'libraries/common/text'),
            jsOAuth: 'libraries/common/js-oauth'
        }
    });

    require(
        ['app'],
        function(App) {
            App.init();
        }
    );
}());