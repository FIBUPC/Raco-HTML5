/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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
				// Reload the page so the application initializes again
				window.location.reload();
			},

			loginErrorCallback: function () {
				Helpers.Environment.showDialogAsync(
					t('An error occurred while trying to authorize this application. Please try again.'),
					t('Authorization error')
				);
			}
		});

		return new LoginView;
	}
);