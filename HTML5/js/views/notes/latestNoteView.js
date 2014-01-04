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

			pageTitle: t('Latest notes'),
			menuElement: '.notes',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

				self.model = NotesController.latestNotes.get(self.options.id);
			},
			
			beforeRender: function() {
				BaseView.prototype.beforeRender.call(self);

				if (!self.model.get('read')) {
					self.model.set('read', true);
					NotesController.markNoteAsRead(self.model.get('id'));
				}
			},

			render: function () {
			    var compiledTemplate = _.template(self.template, { note: self.model });
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));

				var descriptionHTML = $('<div />').html(self.model.get('description')).text();
				Helpers.Environment.showView(descriptionHTML, $('#note-description'));
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('.attachments li').on('click', function(e){
					if (!$('body').hasClass('menu-displayed')) {
						NotesController.openAttachment($(this).data('id'), self.model.get('subject'), $(this).data('name'));
					}
				});
			}
		});

		return LatestNoteView;
	}
);