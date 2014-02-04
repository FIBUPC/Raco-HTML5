/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			/**
			 * Initializes the view
			 **/
			initialize: function () {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.collection = SubjectsController.subjects;
			},
			
			/**
			 * Renders the view
			 **/
			render: function () {
				var compiledTemplate = _.template(self.template, {subjects: self.collection.models});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			/**
			 * Callback for after render event
			 **/
			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			/**
			 * Binds view events
			 **/
			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#subject-list li').click(function(e) {
					if (!$('body').hasClass('menu-displayed')) {
						self.navigate('#!/subjects/' + $(this).data('id'));
					}
				});
			},

			/**
			 * Refreshes the view
			 **/
			refresh: function(force) {
				SubjectsController.getSubjectsAsync(force);
			}
		});

		return new SubjectsView;
	}
);