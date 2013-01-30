define(['text!templates/app/appTemplate.html'], function (appTemplate) {
	'use strict';

	var self,
	AppView = Backbone.View.extend({
		el: '#app',
		template: appTemplate,

		initialize: function() {
			self = this;
		},

		render: function() {
			self.$el.html(self.template);
		}
	});

	return new AppView;
});