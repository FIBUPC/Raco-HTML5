define(
	['../../controllers/loginController',
	 'text!templates/login/loginTemplate.html'],
	function (loginController, loginTemplate) {
		'use strict';

		var self,
		LoginView = Backbone.View.extend({
			el: '#content',
			template: loginTemplate,

			initialize: function() {
				self = this;
			},
			
			render: function() {	
				console.log(self.$el);
				$(self.$el.selector).html(self.template);

				this.bindEvents();
			},

			bindEvents: function() {
				$('#connectButton').click(this.connect);
			},

			connect: function() {
				console.log("connect from view");
				loginController.login();
			}
		});

		return new LoginView;
	}
);