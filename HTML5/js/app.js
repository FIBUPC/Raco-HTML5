define (
    ['router',
     'controllers/login/loginController',
     'controllers/notes/notesController',
     'controllers/subjects/subjectsController',
     'controllers/news/newsController',
     'controllers/timetable/timetableController',
     'controllers/rooms/roomsController',
     'controllers/settings/settingsController',
     'views/app/appView'],
    function (Router, LoginController, NotesController, SubjectsController, NewsController,
        TimetableController, RoomsController, SettingsController, AppView) {
        'use strict';
        
        var App = {};
        
        App.init = function () {
            LoginController.initialize();
            NotesController.initialize();
            SubjectsController.initialize();
            NewsController.initialize();
            TimetableController.initialize();
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
            else if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
                $('<button id="winBackButton" class="win-backbutton" style="display: none;"></button>').prependTo('body');
                document.getElementById('winBackButton').addEventListener('click', function () {
                    $('#back-button').trigger('click');
                }, false);

                $('<div id="appBar" data-win-control="WinJS.UI.AppBar" data-win-options="">' +
                    '<button id="refresh-command" disabled="disabled" data-win-control="WinJS.UI.AppBarCommand" data-win-options="' +
                        '{icon:\'refresh\', label: \'Refresh\', section:\'global\', type:\'button\'}">' +
                    '</button></div>').appendTo('body');
                WinJS.UI.process(document.getElementById('appBar')).then(function () {
                    document.getElementById('refresh-command').addEventListener('click', function () {
                        document.getElementById('appBar').winControl.hide();
                        $('#refresh-button').trigger('click');
                    }, false);
                });
            }

            AppView.render();

            // Add active class to clickable elements when they're touched
            Helpers.Application.setActiveElements();

            Backbone.history.start();
        };

        return App; 
    }
);