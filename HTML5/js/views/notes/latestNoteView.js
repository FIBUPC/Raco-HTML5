define(
	['controllers/notes/notesController',
	 'text!templates/notes/latestNoteTemplate.html'],
	function (NotesController, LatestNoteTemplate) {
		'use strict';

		var self,
		LatestNoteView = Backbone.View.extend({
			el: '#content',
			template: LatestNoteTemplate,

			pageTitle: 'Latest notes',
			menuElement: '.notes',

			initialize: function () {
				self = this;
				console.log(NotesController.latestNotes);
				self.model = NotesController.latestNotes.get(self.options.id);
			},
			
			render: function () {
				$(Constants.Application.PageTitle).html(self.pageTitle);
				Helpers.Application.setMenuActiveElement(self.menuElement);

				var compiledTemplate = _.template(self.template, {note: self.model});
				$(self.$el.selector).html(compiledTemplate);

				var descriptionHTML = $('<div />').html(self.model.get('description')).text();
				$('#note-description').html(descriptionHTML);

				$('.page').removeClass('hide');

				self.bindEvents();
			},

			bindEvents: function () {
				self.model.on('change', self.render);
				self.model.on('reset', self.render);
			}
		});

		return LatestNoteView;
	}
);