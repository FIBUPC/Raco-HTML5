define(
	['text!templates/app/menuTemplate.html'],
	function (menuTemplate) {
		'use strict';

		var self,
		MenuView = Backbone.View.extend({
			el: '#menu',
			template: menuTemplate,

			initialize: function() {
				self = this;
			},
			
			render: function() {
				self.$el.html(self.template);
			}
		});
		
		return MenuView;
	}
);