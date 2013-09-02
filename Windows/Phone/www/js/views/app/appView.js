define(
	['text!templates/app/appTemplate.html',
	 './headerView',
	 './menuView'],
	function (appTemplate, HeaderView, MenuView) {
		'use strict';

		var self,
		AppView = Backbone.View.extend({
			el: '#app',
			template: appTemplate,
			headerView: null,
			menuView: null,

			initialize: function() {
				self = this;
			},

			render: function() {				
				self.$el.html(self.template);

				self.headerView = new HeaderView();
				self.menuView = new MenuView();

				self.headerView.render();
				self.menuView.render();
			}
		});

		return new AppView;
	}
);