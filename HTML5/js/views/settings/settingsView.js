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

			/**
			 * Initializes the view
			 **/
			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
			},
			
			/**
			 * Renders the view
			 **/
			render: function () {
			    var compiledTemplate = _.template(self.template, {
			    	selectedAction: SettingsController.selectedAction
			    });
			    Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#actions').on('change', function(){
					var selectedAction = $(this).find(':selected').val();
					SettingsController.saveSelectedActionAsync(selectedAction);
				});
			}
		});

		return new SettingsView;
	}
);