define(
	['views/app/baseView',
	 'controllers/settings/settingsController',
	 'text!templates/settings/settingsTemplate.html'],
	function (BaseView, SettingsController, SettingsTemplate) {
		'use strict';

		var self,
		SettingsView = BaseView.extend({
			el: '#content',
			template: SettingsTemplate,

			pageTitle: 'Configuració',
			menuElement: '.settings',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template);
				$(self.$el.selector).html(compiledTemplate);
			}
		});

		return new SettingsView;
	}
);