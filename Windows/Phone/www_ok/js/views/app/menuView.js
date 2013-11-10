define(
	['text!templates/app/menuTemplate.html'],
	function (MenuTemplate) {
		'use strict';

		var self,
		MenuView = Backbone.View.extend({
			el: '#menu',
			template: MenuTemplate,

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