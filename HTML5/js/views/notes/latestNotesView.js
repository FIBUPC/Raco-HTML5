define(
	['controllers/notes/notesController',
	 'text!templates/notes/latestNotesTemplate.html'],
	function (NotesController, LatestNotesTemplate) {
		'use strict';

		var self,
		LatestNotesView = Backbone.View.extend({
			el: '#content',
			template: LatestNotesTemplate,

			initialize: function () {
				self = this;
			},
			
			render: function () {
				NotesController.getLatestNotesAsync();

				$(self.$el.selector).html(self.template);

				self.bindEvents();
			},

			bindEvents: function () {
				
			}
		});

		return new LatestNotesView;
	}
);