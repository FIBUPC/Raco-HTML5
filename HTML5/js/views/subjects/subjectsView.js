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
				self.collection = SubjectsController.subjects;
			},
			
			render: function () {
				$(Constants.Application.PageTitle).html(self.pageTitle);
				Helpers.Application.setMenuActiveElement(self.menuElement);

				var compiledTemplate = _.template(self.template, {subjects: self.collection.models});
				$(self.$el.selector).html(compiledTemplate);

				self.bindEvents();

				SubjectsController.getSubjectsAsync();
			},

			bindEvents: function () {
				self.collection.on('change', self.render);
				self.collection.on('reset', self.render);
			}
		});

		return new SubjectsView;
	}
);