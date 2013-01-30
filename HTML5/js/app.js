define (['router', 'controllers/loginController'], function (AppRouter, loginController) {
    'use strict';
    
    var App = {};
    
    App.init = function () {       
    	Backbone.history.start();

    	router.navigate(window.location.hash);
    };
      
    return App; 
});