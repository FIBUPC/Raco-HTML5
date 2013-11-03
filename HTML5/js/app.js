define (
    ['router',
     'controllers/login/loginController',
     'views/app/appView',
     'libraries/mobileDetector'],
    function (Router, LoginController, AppView, MobileDetector) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            MobileDetector.detectMobileOS();
            MobileDetector.detectNativeApp();

            LoginController.initialize();
            
            AppView.render();

            Backbone.history.start();
        };

        return App; 
    }
);