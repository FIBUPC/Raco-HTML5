define(
	['../../controllers/login/loginController',
	 'text!templates/login/loginTemplate.html'],
	function (LoginController, LoginTemplate) {
		'use strict';

		var self,
		LoginView = Backbone.View.extend({
			el: '#content',
			template: LoginTemplate,

			initialize: function () {
				self = this;
			},
			
			render: function () {
				$('body').addClass('login');

				var compiledTemplate = _.template(self.template);
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
				self.bindEvents();
			},

			bindEvents: function () {
				$('#connectButton').click(self.connect);
			},

			connect: function () {
				LoginController.login(self.loginCompletedCallback, self.loginErrorCallback);
			},

			loginCompletedCallback: function () {
				window.location.reload();
			},

			loginErrorCallback: function () {
				console.log("An error occurred while trying to authorize this application. Please try again.");
			}
		});

		return new LoginView;
	}
);