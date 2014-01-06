define (
    ['router',
     'controllers/login/loginController',
     'controllers/notes/notesController',
     'controllers/subjects/subjectsController',
     'controllers/news/newsController',
     'controllers/timetable/timetableController',
     'controllers/rooms/roomsController',
     'controllers/settings/settingsController',
     'controllers/notifications/notificationsController',
     'views/app/appView'],
    function (Router, LoginController, NotesController, SubjectsController, NewsController,
        TimetableController, RoomsController, SettingsController, NotificationsController, AppView) {
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
            NotificationsController.initialize();
            
            if (MobileDetector.isIOS()) {
                // Check if app or browser to make the header bigger
                try
                {
                    if (navigator.standalone || MobileDetector.isNativeApp()) {
                        $('body').addClass('standalone');
                    }
                }
                catch(e) {
                    // Ignore this exception
                }

                // Clear badge notifications on launch
                /*if (window.plugins.pushNotifications) {
                    try
                    {
                        window.plugins.pushNotifications.setApplicationIconBadgeNumber(function(){}, function(){}, 0);
                    }
                    catch (e) {
                        // Ignore this exception
                    }
                }*/
            }
            else if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
                // Clear tile updates
                var tileUpdater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();
                tileUpdater.clear();

                if (LoginController.isLoggedIn()) {
                    $('<button id="winBackButton" class="win-backbutton" style="display: none;"></button>').prependTo('body');
                    document.getElementById('winBackButton').addEventListener('click', function () {
                        $('#back-button').trigger('click');
                    }, false);

                    $('<div id="appBar" data-win-control="WinJS.UI.AppBar" data-win-options="">' +
                        '<button id="refresh-command" disabled="disabled" data-win-control="WinJS.UI.AppBarCommand" data-win-options="' +
                            '{icon:\'refresh\', label: \'' + t('Refresh') +  '\', section:\'selection\', type:\'button\'}">' +
                        '<button id="settings-command" data-win-control="WinJS.UI.AppBarCommand" data-win-options="' +
                            '{icon:\'settings\', label: \'' + t('Settings') + '\', section:\'global\', type:\'button\'}">' +
                        '<button id="logout-command" data-win-control="WinJS.UI.AppBarCommand" data-win-options="' +
                            '{icon:\'closepane\', label: \'' + t('Sign out') + '\', section:\'global\', type:\'button\'}">' +
                        '</button></div>').appendTo('body');
                    WinJS.UI.process(document.getElementById('appBar')).then(function () {
                        document.getElementById('refresh-command').addEventListener('click', function () {
                            document.getElementById('appBar').winControl.hide();
                            $('#refresh-button').trigger('click');
                        }, false);
                        document.getElementById('settings-command').addEventListener('click', function () {
                            document.getElementById('appBar').winControl.hide();
                            $('#menu #tabs li.settings').trigger('click');
                        }, false);
                        document.getElementById('logout-command').addEventListener('click', function () {
                            document.getElementById('appBar').winControl.hide();
                            $('#menu #tabs li.logout').trigger('click');
                        }, false);
                    });
                }
            }

            NotificationsController.enablePushNotifications();
            //NotificationsController.disablePushNotifications();

            AppView.render();

            // Add active class to clickable elements when they're touched
            Helpers.Application.setActiveElements();

            Backbone.history.start();
        };

        return App; 
    }
);