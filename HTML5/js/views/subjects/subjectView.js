/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			pageTitle: t('Subjects'),
			menuElement: '.subjects',

			/**
			 * Initializes the view
			 **/
			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.model = SubjectsController.subjects.get(self.options.id);
			},
			
			/**
			 * Renders the view
			 **/
			render: function() {
				var compiledTemplate = _.template(self.template, {subject: self.model});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			/**
			 * Binds view events
			 **/
			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#subject-notes li').on('click', function(){
					if (!$('body').hasClass('menu-displayed')) {
						self.navigate('#!/subjects/' + self.model.get('codi_upc') + 
							'/notes/' + $(this).data('id'));
					}
				});
			}
		});

		return SubjectView;
	}
);