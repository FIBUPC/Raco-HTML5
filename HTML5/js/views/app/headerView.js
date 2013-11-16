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

				$menuToggleButton.bind('click touchend', function(e){
					e.preventDefault();
					e.stopPropagation();

					var $body = $('body');
					var $html = $('html');
					var $applicationWrapper = $('#application-wrapper');

					if ($body.hasClass('menu-displayed')) {
						$applicationWrapper.unbind('click touchend');

						$html.css({
							height: 'auto',
							overflow: 'auto'
						});
						$body.removeClass('menu-displayed');
					}
					else {
						$applicationWrapper.click(function(e){
							e.preventDefault();
							e.stopPropagation();

							$menuToggleButton.trigger('touchend');

							return false;
						});

						$html.css({
							height: $('#menu').height(),
							overflow: 'hidden'
						});

						window.scrollTo(0, 0);
						$body.addClass('menu-displayed');
					}

					return false;
				});
			}
		});
		
		return HeaderView;
	}
);