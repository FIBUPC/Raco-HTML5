/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
    ['controllers/login/loginController',
     'controllers/settings/settingsController',
     'views/login/loginView',
     'views/notes/latestNotesView',
     'views/notes/latestNoteView',
     'views/subjects/subjectsView',
     'views/subjects/subjectView',
     'views/notes/subjectNoteView',
     'views/news/newsView',
     'views/news/fibNewView',
     'views/news/upcNewView',
     'views/rooms/roomsView',
     'views/rooms/roomView',
     'views/timetable/timetableView',
     'views/settings/settingsView'],
    function (LoginController, SettingsController, LoginView, LatestNotesView,
        LatestNoteView, SubjectsView, SubjectView, SubjectNoteView, NewsView,
        FIBNewView, UPCNewView, RoomsView, RoomView, TimetableView, SettingsView) {
        'use strict';

        var self,
        AppRouter = Backbone.Router.extend({
            // These are the main points of entrance to the app
            routes: {
                '': 'default', // default action (no hash specified)
                '!/login': 'login',
                '!/logout': 'logout',
                '!/latestNotes': 'latestNotes',
                '!/subjects': 'subjects',
                '!/latestNotes/:id': 'latestNote',
                '!/subjects/:id': 'subject',
                '!/subjects/:subject/notes/:note': 'subjectNote',
                '!/timetable': 'timetable',
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

            default: function () {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }
                
                if (SettingsController.selectedAction != null) {
                    self.navigate(SettingsController.selectedAction, { trigger: true });
                }
                else {
                    self.navigate(self.defaultAction, { trigger: true });
                }
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

            latestNotes: function () {
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

            subjectNote: function(subject, note) {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                (new SubjectNoteView({ subject: subject, note: note })).render();
            },

            timetable: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('!/login', { trigger: true });
                    return;
                }

                TimetableView.render();
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