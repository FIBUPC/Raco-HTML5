define(
	['controllers/subjects/subjectsController',
	 'text!templates/subjects/subjectsTemplate.html'],
	function (SubjectsController, SubjectsTemplate) {
		'use strict';

		var self,
		SubjectsView = Backbone.View.extend({
			el: '#content',
			template: SubjectsTemplate,

			pageTitle: 'Subjects',
			menuElement: '.subjects',

			initialize: function () {
				self = this;
			},
			
			render: function () {
				SubjectsController.getSubjectsAsync();

				$(Constants.Application.PageTitle).html(self.pageTitle);
				Helpers.Application.setMenuActiveElement(self.menuElement);
				$(self.$el.selector).html(self.template);

				self.bindEvents();
			},

			bindEvents: function () {
				
			}
		});

		return new SubjectsView;
	}
);