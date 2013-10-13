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
                '': 'home',         // default action
                'home': 'home',     // home action
                'login': 'login'    // login action
            },

            initialize: function () {
                self = this;

                // Since there is no way to navigate to another page from a BackboneJS View
                // when using RequireJS we extend the basic View to have a navigation method
                Backbone.View.prototype.navigate = function(hash, trigger) {
                    // This just calls the original navigate method of the AppRouter
                    self.navigate(hash, {
                        trigger: (typeof(trigger) == 'undefined' ? false : trigger)
                    });
                }
            },

            home: function () {
                if (!LoginController.isLoggedIn()) {
                    self.navigate('login', { trigger: true });
                    return;
                }

                LatestNotesView.render();
            },

            login: function () {
                LoginView.render();
            }
        });
        
        return new AppRouter;
    }
);