/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			pageTitle: t('Subjects'),
			menuElement: '.subjects',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.subject = SubjectsController.subjects.get(self.options.subject);
				if (self.subject) {
					self.note = self.subject.get('notes').get(self.options.note);
				}
			},

			beforeRender: function() {
				BaseView.prototype.beforeRender.call(self);

				if (!self.note.get('read')) {
					self.note.set('read', true);
					NotesController.markNoteAsRead(self.note.get('id'));
				}
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {
					note: self.note,
					subject: self.subject
				});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));

				Helpers.Environment.showView(self.note.get('description'), $('#note-description'));
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
					if (!$('body').hasClass('menu-displayed')) {
						NotesController.openAttachment($(this).data('id'), self.subject.get('idAssig'), $(this).data('name'));
					}
				});
			}
		});

		return SubjectNoteView;
	}
);