define (
    ['router',
     'controllers/login/loginController',
     'controllers/notes/notesController',
     'views/app/appView'],
    function (Router, LoginController, NotesController, AppView) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            LoginController.initialize();
            NotesController.initialize();
            
            AppView.render();

            Backbone.history.start();
        };

        return App; 
    }
);