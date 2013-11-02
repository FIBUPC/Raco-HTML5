define(
    ['controllers/login/loginController',
     'views/login/loginView',
     'views/notes/latestNotesView'],
    function (LoginController, LoginView, LatestNotesView) {
        'use strict';

        var self,
        AppRouter = Backbone.Router.extend({
            // These are the main point of entrance to the app
            routes: {
                '': 'default',         // default action
                'home': 'home',     // home action
                'login': 'login'    // login action
            },

            defaultAction: 'home',

            initialize: function () {
                self = this;
            },

            default: function() {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('login', { trigger: true });
                    return;
                }

                self.navigate(self.defaultAction, { trigger: true });
            },

            home: function () {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('login', { trigger: true });
                    return;
                }

                LatestNotesView.render();
            },

            login: function () {
                if (LoginController.isLoggedIn()) {
                    self.navigate(self.defaultAction, { trigger: true });
                    return;
                }

                LoginView.render();
            }
        });
        
        return new AppRouter;
    }
);