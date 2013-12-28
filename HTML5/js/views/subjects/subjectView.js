define(
	['views/app/baseView',
	 'controllers/subjects/subjectsController',
	 'text!templates/subjects/subjectTemplate.html'],
	function (BaseView, SubjectsController, SubjectTemplate) {
		'use strict';

		var self,
		SubjectView = BaseView.extend({
			el: '#content',
			template: SubjectTemplate,

			pageTitle: 'Assignatures',
			menuElement: '.subjects',
			refreshable: true,

			initialize: function () {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.model = SubjectsController.subjects.get(self.options.id);
			},
			
			render: function () {
				var compiledTemplate = _.template(self.template, {subject: self.model});
				$(self.$el.selector).html(compiledTemplate);
			},

			refresh: function(force) {
				// TODO: refresh subject information
			}
		});

		return SubjectView;
	}
);