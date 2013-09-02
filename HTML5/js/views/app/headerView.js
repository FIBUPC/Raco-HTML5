define(
	['text!templates/app/headerTemplate.html'],
	function (headerTemplate) {
		'use strict';

		var self,
		HeaderView = Backbone.View.extend({
			el: '#header',
			template: headerTemplate,

			initialize: function() {
				self = this;
			},

			render: function() {
				self.$el.html(self.template);
			}
		});
		
		return HeaderView;
	}
);