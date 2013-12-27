define(
	['text!templates/app/appTemplate.html',
	 './headerView',
	 './menuView',
	 '../../controllers/login/loginController'],
	function (AppTemplate, HeaderView, MenuView, LoginController) {
		'use strict';

		var self,
		AppView = Backbone.View.extend({
			el: '#app',
			template: AppTemplate,
			headerView: null,
			menuView: null,

			initialize: function() {
				self = this;
			},

			render: function() {				
				self.$el.html(self.template);

				if (LoginController.isLoggedIn()) {
					self.headerView = new HeaderView();
					self.headerView.render();

					self.menuView = new MenuView();
					self.menuView.render();

					self.bindEvents();
				}
			},

			bindEvents: function() {
				var $menuToggleButton = $('#menu-toggle-button');
				var $backButton = $('#back-button');
				var $body = $('body');
				var $app = $('#app');

				$app.on('swiperight', function(e){
					e.preventDefault();
					e.stopPropagation();

					if (!$body.hasClass('menu-displayed') && $menuToggleButton.is(':visible')) {
						$menuToggleButton.trigger('click');
					}
					else if ($backButton.is(':visible')) {
						$backButton.trigger('click');
					}

					return false;
				});

				$app.on('swipeleft', function(e){
					e.preventDefault();
					e.stopPropagation();

					if ($body.hasClass('menu-displayed') && $menuToggleButton.is(':visible')) {
						$menuToggleButton.trigger('click');
					}

					return false;
				});
			}
		});

		return new AppView;
	}
);