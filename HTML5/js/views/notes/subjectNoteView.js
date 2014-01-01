define(
	['views/app/baseView',
	 'controllers/notes/notesController',
	 'controllers/subjects/subjectsController',
	 'text!templates/notes/subjectNoteTemplate.html'],
	function(BaseView, NotesController, SubjectsController, SubjectNoteTemplate) {
		'use strict';
		
		var self,
		SubjectNoteView = BaseView.extend({
			el: '#content',
			template: SubjectNoteTemplate,

			pageTitle: 'Assignatures',
			menuElement: '.subjects',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.subject = SubjectsController.subjects.get(self.options.subject);
				if (self.subject) {
					self.note = self.subject.get('notes').get(self.options.note);
				}
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {
					note: self.note,
					subject: self.subject
				});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));

				var descriptionHTML = $('<div />').html(self.model.get('description')).text();
				Helpers.Environment.showView(descriptionHTML, $('#note-description'));
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				if (self.subject) {
					self.subject.on('change', self.render, this);
				}

				if (self.note) {
					self.note.on('change', self.render, this);
				}

				$('.attachments li').on('click', function(e){
					NotesController.openAttachment($(this).data('id'), self.subject.get('idAssig'), $(this).data('name'));
				});
			}
		});

		return SubjectNoteView;
	}
);