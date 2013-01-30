define(['text!templates/login/loginTemplate.html'], function (loginTemplate) {
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
		}
	});

	return new LoginView;
});