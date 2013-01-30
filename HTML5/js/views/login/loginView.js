define([/*'text!../templates/login/loginTemplate.html'*/], function (/*loginTemplate*/) {
	'use strict';

	var self,
	LoginView = Backbone.View.extend({
		el: '#app',

		initialize: function() {
			self = this;
		},

		render: function() {
			console.log("hey");
			self.$el.html("<p>Login page</p>");
		}
	});

	return new LoginView;
});