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

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.model = SubjectsController.subjects.get(self.options.id);
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {subject: self.model});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			refresh: function(force) {
				// TODO: refresh subject information
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#subject-notes li').on('click', function(){
					self.navigate('#!/subjects/' + self.model.get('codi_upc') + 
						'/notes/' + $(this).data('id'));
				});
			}
		});

		return SubjectView;
	}
);