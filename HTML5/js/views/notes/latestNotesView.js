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

			pageTitle: 'Últims avisos',
			menuElement: '.notes',
			refreshable: true,

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.collection = NotesController.latestNotes;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, { latestNotes: self.collection.models });
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#latest-notes li').on('click', function(e) {
					self.navigate('#!/latestNotes/' + $(this).data('id'));
				});
			},

			refresh: function(force) {
				NotesController.getLatestNotesAsync(force);
			}
		});

		return new LatestNotesView;
	}
);