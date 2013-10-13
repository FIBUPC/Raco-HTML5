define (
    ['router',
     'controllers/login/loginController',
     'views/app/appView'],
    function (Router, LoginController, AppView) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            LoginController.initialize();
            
            AppView.render();

            Backbone.history.start();
        };

        return App; 
    }
);