define(['views/login/loginView'/*, 'views/notes/latestNotesView'*/], function (loginView/*, latestNotesView*/) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'main',
            'login': 'login',
            'latestNotes': 'latestNotes'
        },

        main: function() {
            console.log("router main");
            /*if (loginHelper.isLoggedIn())
                login();
            else
                latestNotes(); //TODO: check for user preferred home screen*/
        },

        login: function () {
            loginView.render();
        },

        latestNotes: function () {
            console.log("router latestNotes");
        }
    });

    return new AppRouter;
});