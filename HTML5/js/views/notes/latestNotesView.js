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

			pageTitle: 'Latest notes',
			menuElement: '.notes',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.collection = NotesController.latestNotes;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {latestNotes: self.collection.models});
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);

				NotesController.getLatestNotesAsync();
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#latest-notes li').on('click', function(e) {
					self.navigate('#!/latestNotes/' + $(this).data('id'));
				});
			}
		});

		return new LatestNotesView;
	}
);