define (
    ['router',
     'controllers/login/loginController',
     'controllers/notes/notesController',
     'controllers/subjects/subjectsController',
     'controllers/news/newsController',
     'controllers/timetable/timetableController',
     'controllers/calendar/calendarController',
     'controllers/rooms/roomsController',
     'controllers/settings/settingsController',
     'views/app/appView'],
    function (Router, LoginController, NotesController, SubjectsController, NewsController,
        TimetableController, CalendarController, RoomsController, SettingsController, AppView) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            LoginController.initialize();
            NotesController.initialize();
            SubjectsController.initialize();
            NewsController.initialize();
            TimetableController.initialize();
            CalendarController.initialize();
            RoomsController.initialize();
            SettingsController.initialize();
            
            if (MobileDetector.isIOS()) {
                // In iOS, we must check first for the app launching directly from the Start Screen

                try
                {
                    if (navigator.standalone || MobileDetector.isNativeApp()) {
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