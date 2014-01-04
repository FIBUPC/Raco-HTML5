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
			    $('#menu #tabs li.clickable').click(function (e) {
			        e.preventDefault();
			        e.stopPropagation();

			        if ($('#loading-layer').is(':visible')) {
			            return false;
			        }

			        if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
			            WinJS.Navigation.history.backStack.push(window.location.hash);
			        }

			        window.location.hash = decodeURI($(this).find('a').attr('href'));

					if ($('body').hasClass('menu-displayed')) {
						$('#menu-toggle-button').trigger('click');
					}

					return false;
			    });
			}
		});
		
		return MenuView;
	}
);