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
				$(self.$el.selector).html(self.template);

				self.bindEvents();
			},

			bindEvents: function () {
				$('#connectButton').click(self.connect);
			},

			connect: function () {
				LoginController.login(self.loginCompletedCallback, self.loginErrorCallback);
			},

			loginCompletedCallback: function () {
				// TODO: this doesn't work
				self.navigate('home', true);
			},

			loginErrorCallback: function () {
				// TODO: show error message
			}
		});

		return new LoginView;
	}
);