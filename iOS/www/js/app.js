define (
    ['router',
     'controllers/login/loginController',
     'controllers/notes/notesController',
     'controllers/subjects/subjectsController',
     'views/app/appView'],
    function (Router, LoginController, NotesController, SubjectsController, AppView) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            LoginController.initialize();
            NotesController.initialize();
            SubjectsController.initialize();
            
            if (MobileDetector.isIOS()) {
                // In iOS, we must check first for the app launching directly from the Start Screen

                try
                {
                    if (navigator.standalone) {
                        $('body').addClass('standalone');
                    }
                }
                catch(e) { }
            }

            AppView.render();

            // Add active class to clickable elements when they're touched
            Helpers.Application.setActiveElements();

            Backbone.history.start();
        };

        return App; 
    }
);