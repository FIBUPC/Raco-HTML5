define (
    ['router',
     'controllers/loginController',
     'views/app/appView'],
    function (router, loginController, appView) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            loginController.initialize();
            
            appView.render();

            Backbone.history.start();
        };

        return App; 
    }
);