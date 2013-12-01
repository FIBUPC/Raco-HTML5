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
				}
			}
		});

		return new AppView;
	}
);