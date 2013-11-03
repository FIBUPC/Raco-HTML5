define(
	['controllers/notes/notesController',
	 'text!templates/notes/latestNotesTemplate.html'],
	function (NotesController, LatestNotesTemplate) {
		'use strict';

		var self,
		LatestNotesView = Backbone.View.extend({
			el: '#content',
			template: LatestNotesTemplate,

			pageTitle: 'Latest notes',
			menuElement: '.notes',

			initialize: function () {
				self = this;
			},
			
			render: function () {
				NotesController.getLatestNotesAsync();

				$(Constants.Application.PageTitle).html(self.pageTitle);
				Helpers.Application.setMenuActiveElement(self.menuElement);
				$(self.$el.selector).html(self.template);

				self.bindEvents();
			},

			bindEvents: function () {
				
			}
		});

		return new LatestNotesView;
	}
);