define (
    ['router',
     'controllers/login/loginController',
     'controllers/notes/notesController',
     'views/app/appView',
     'libraries/mobileDetector'],
    function (Router, LoginController, NotesController, AppView, MobileDetector) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            MobileDetector.detectMobileOS();
            MobileDetector.detectNativeApp();

            LoginController.initialize();
            NotesController.initialize();
            
            AppView.render();

            Backbone.history.start();
        };

        return App; 
    }
);