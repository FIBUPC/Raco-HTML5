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

				self.bindEventHandlers();
			},

			bindEventHandlers: function() {
				$('#menu #tabs li.clickable a').click(function(){
					if ($('body').hasClass('menu-displayed') && $('#menu-toggle-button:visible').length > 0) {
						$('#menu-toggle-button').trigger('touchend');
					}
				});
			}
		});
		
		return MenuView;
	}
);