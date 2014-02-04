/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			pageTitle: t('Settings'),
			menuElement: '.settings',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
			},
			
			render: function () {
			    var compiledTemplate = _.template(self.template);
			    $(self.$el.selector).html(compiledTemplate);

			    if (MobileDetector.isWindows()) {
			        $('.page').addClass('hide');
			    }
			}
		});

		return new SettingsView;
	}
);