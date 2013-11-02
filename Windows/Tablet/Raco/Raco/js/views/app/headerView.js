define(
	['text!templates/app/headerTemplate.html'],
	function (HeaderTemplate) {
		'use strict';

		var self,
		HeaderView = Backbone.View.extend({
			el: '#header',
			template: HeaderTemplate,

			initialize: function() {
				self = this;
			},

			render: function() {
				self.$el.html(self.template);

				this.bindMenuToggleButton();
			},

			bindMenuToggleButton: function() {
				var $menuToggleButton = $('#menu-toggle-button');

				$menuToggleButton.click(function(e){
					e.preventDefault();
					e.stopPropagation();

					var $body = $('body');
					var $applicationWrapper = $('#application-wrapper');

					if ($body.hasClass('menu-displayed')) {
						$applicationWrapper.unbind('click');

						$body.removeClass('menu-displayed');
					}
					else {
						$applicationWrapper.click(function(e){
							e.preventDefault();
							e.stopPropagation();

							$menuToggleButton.trigger('click');

							return false;
						});

						$body.addClass('menu-displayed');
					}

					return false;
				});
			}
		});
		
		return HeaderView;
	}
);