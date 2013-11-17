define(
	['views/app/baseView',
	 'controllers/subjects/subjectsController',
	 'text!templates/subjects/subjectsTemplate.html'],
	function (BaseView, SubjectsController, SubjectsTemplate) {
		'use strict';

		var self,
		SubjectsView = BaseView.extend({
			el: '#content',
			template: SubjectsTemplate,

			pageTitle: 'Subjects',
			menuElement: '.subjects',

			initialize: function () {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.collection = SubjectsController.subjects;
			},
			
			render: function () {
				var compiledTemplate = _.template(self.template, {subjects: self.collection.models});
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);

				SubjectsController.getSubjectsAsync();
			}
		});

		return new SubjectsView;
	}
);