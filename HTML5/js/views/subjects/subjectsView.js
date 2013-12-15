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

			pageTitle: 'Assignatures',
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
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#subject-list li').click(function(e) {
					self.navigate('#!/subjects/' + $(this).data('id'));
				});
			}
		});

		return new SubjectsView;
	}
);