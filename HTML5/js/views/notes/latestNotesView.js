/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['views/app/baseView',
	 'controllers/notes/notesController',
	 'text!templates/notes/latestNotesTemplate.html'],
	function (BaseView, NotesController, LatestNotesTemplate) {
		'use strict';

		var self,
		LatestNotesView = BaseView.extend({
			el: '#content',
			template: LatestNotesTemplate,

			pageTitle: t('Latest notes'),
			menuElement: '.notes',
			refreshable: true,

			/**
			 * Initializes the view
			 **/
			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.collection = NotesController.latestNotes;
			},
			
			/**
			 * Renders the view
			 **/
			render: function() {
				var compiledTemplate = _.template(self.template, { latestNotes: self.collection.models });
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			/**
			 * Binds view events
			 **/
			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#latest-notes li').on('click', function(e) {
					if (!$('body').hasClass('menu-displayed')) {
						self.navigate('#!/latestNotes/' + $(this).data('id'));
					}
				});
			},

			/**
			 * Refreshes view contents
			 **/
			refresh: function(force) {
				NotesController.getLatestNotesAsync(force);
			}
		});

		return new LatestNotesView;
	}
);