define(
    ['controllers/login/loginController',
     'views/login/loginView',
     'views/notes/latestNotesView',
     'views/notes/latestNoteView',
     'views/subjects/subjectsView',
     'views/subjects/subjectView',
     'views/news/newsView',
     'views/news/fibNewView',
     'views/news/upcNewView',
     'views/rooms/roomsView',
     'views/rooms/roomView',
     'views/timetable/timetableView',
     'views/calendar/calendarView',
     'views/settings/settingsView'],
    function (LoginController, LoginView, LatestNotesView, LatestNoteView, SubjectsView, SubjectView,
        NewsView, FIBNewView, UPCNewView, RoomsView, RoomView, TimetableView, CalendarView, SettingsView) {
        'use strict';

        var self,
        AppRouter = Backbone.Router.extend({
            // These are the main point of entrance to the app
            routes: {
                '': 'default', // default action (no hash specified)
                '!/login': 'login',
                '!/logout': 'logout',
                '!/latestNotes': 'latestNotes',
                '!/subjects': 'subjects',
                '!/latestNotes/:id': 'latestNote',
                '!/subjects/:id': 'subject',
                '!/timetable': 'timetable',
                '!/calendar': 'calendar',
                '!/rooms': 'rooms',
                '!/rooms/:id': 'room',
                '!/news': 'news',
                '!/news/fib/:id': 'fibNew',
                '!/news/upc/:id': 'upcNew',
                '!/settings': 'settings'
            },

            defaultAction: '!/latestNotes',

            initialize: function () {
                self = this;
            },

            default: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                // TODO: check for predefined user default action
                self.navigate(self.defaultAction, { trigger: true });
            },

            login: function() {
                if (LoginController.isLoggedIn()) {
                    self.navigate(self.defaultAction, { trigger: true });
                    return;
                }

                LoginView.render();
            },

            logout: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                LoginController.logout(function() {
                    window.location.reload();
                });
            },

            latestNotes: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                LatestNotesView.render();
            },

            latestNote: function(id) {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                (new LatestNoteView({ id: id })).render();
            },

            subjects: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                SubjectsView.render();
            },

            subject: function(id) {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                (new SubjectView({ id: id})).render();
            },

            timetable: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                TimetableView.render();
            },

            calendar: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                CalendarView.render();
            },

            news: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                NewsView.render();
            },

            fibNew: function(id) {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                (new FIBNewView({ id: id })).render();
            },

            upcNew: function(id) {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                (new UPCNewView({ id: id })).render();
            },

            rooms: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                RoomsView.render();
            },

            room: function(id) {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                (new RoomView({ id: id })).render();
            },

            settings: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                SettingsView.render();
            }
        });
        
        return new AppRouter;
    }
);