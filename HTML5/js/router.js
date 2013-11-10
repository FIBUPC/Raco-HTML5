define(
    ['controllers/login/loginController',
     'views/login/loginView',
     'views/notes/latestNotesView',
     'views/subjects/subjectsView'],
    function (LoginController, LoginView, LatestNotesView, SubjectsView) {
        'use strict';

        var self,
        AppRouter = Backbone.Router.extend({
            // These are the main point of entrance to the app
            routes: {
                '': 'default', // default action (no hash specified)
                'login': 'login',
                'logout': 'logout',
                'latestNotes': 'latestNotes',
                'subjects': 'subjects'
            },

            defaultAction: 'latestNotes',

            initialize: function () {
                self = this;
            },

            default: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('login', { trigger: true });
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
                    self.navigate('login', { trigger: true });
                    return;
                }

                LoginController.logout(function() {
                    window.location.reload();
                });
            },

            latestNotes: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('login', { trigger: true });
                    return;
                }

                LatestNotesView.render();
            },

            subjects: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('login', { trigger: true });
                    return;
                }

                SubjectsView.render();
            }
        });
        
        return new AppRouter;
    }
);