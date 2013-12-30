define(
	['views/app/baseView',
	 'controllers/notes/notesController',
	 'text!templates/notes/latestNoteTemplate.html'],
	function(BaseView, NotesController, LatestNoteTemplate) {
		'use strict';
		
		var self,
		LatestNoteView = BaseView.extend({
			el: '#content',
			template: LatestNoteTemplate,

			pageTitle: 'Últims avisos',
			menuElement: '.notes',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.model = NotesController.latestNotes.get(self.options.id);
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {note: self.model});
				$(self.$el.selector).html(compiledTemplate);

				var descriptionHTML = $('<div />').html(self.model.get('description')).text();
				$('#note-description').html(descriptionHTML);
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('.attachments li').on('click', function(e){
					NotesController.openAttachment($(this).data('id'), self.model.get('subject'), $(this).data('name'));
				});
			}
		});

		return LatestNoteView;
	}
);