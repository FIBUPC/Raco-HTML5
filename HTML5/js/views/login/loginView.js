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

			/**
			 * Initializes the view
			 **/
			initialize: function () {
				self = this;
			},
			
			/**
			 * Renders the view
			 **/
			render: function () {
				$('body').addClass('login');

				var compiledTemplate = _.template(self.template);
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
				self.bindEvents();
			},

			/**
			 * Binds view events
			 **/
			bindEvents: function () {
				$('#connectButton').click(self.connect);
			},

			/**
			 * Connects to oAuth authentication server
			 **/
			connect: function () {
				LoginController.login(self.loginCompletedCallback, self.loginErrorCallback);
			},

			/**
			 * Callback for login completed event
			 **/
			loginCompletedCallback: function () {
				// Reload the page so the application initializes again
				window.location.reload();
			},

			/**
			 * Callback for login error event
			 **/
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