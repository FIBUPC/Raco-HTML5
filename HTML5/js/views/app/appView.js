/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			/**
			 * Initializes the view
			 **/
			initialize: function() {
				self = this;
			},

			/**
			 * Renders the view
			 **/
			render: function() {
				Helpers.Environment.showView(self.template, $(self.$el.selector));

				if (LoginController.isLoggedIn()) {
					self.headerView = new HeaderView();
					self.headerView.render();

					self.menuView = new MenuView();
					self.menuView.render();

					self.bindEvents();
				}
			},

			/**
			 * Bind view events
			 **/
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