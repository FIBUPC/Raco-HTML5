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

			pageTitle: t('Subjects'),
			menuElement: '.subjects',
			refreshable: true,

			initialize: function () {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.collection = SubjectsController.subjects;
			},
			
			render: function () {
				var compiledTemplate = _.template(self.template, {subjects: self.collection.models});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#subject-list li').click(function(e) {
					if (!$('body').hasClass('menu-displayed')) {
						self.navigate('#!/subjects/' + $(this).data('id'));
					}
				});
			},

			refresh: function(force) {
				SubjectsController.getSubjectsAsync(force);
			}
		});

		return new SubjectsView;
	}
);