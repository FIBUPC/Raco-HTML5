define(
    ['controllers/loginController',
     'views/login/loginView',
     'views/notes/latestNotesView'],
    function (loginController, loginView, latestNotesView) {
        'use strict';

        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'main',
                'login': 'login'
            },

            main: function() {
                if (!loginController.isLoggedIn()) {
                    this.navigate('login', { trigger: true });
                    return;
                }

                latestNotesView.render();
            },

            login: function () {
                loginView.render();
            }
        });
        
        return new AppRouter;
    }
);