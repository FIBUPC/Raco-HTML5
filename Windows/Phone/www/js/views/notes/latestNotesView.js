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
				self.collection = NotesController.latestNotes;
			},
			
			render: function () {
				$(Constants.Application.PageTitle).html(self.pageTitle);
				Helpers.Application.setMenuActiveElement(self.menuElement);

				var compiledTemplate = _.template(self.template, {latestNotes: self.collection.models});
				$(self.$el.selector).html(compiledTemplate);

				self.bindEvents();

				NotesController.getLatestNotesAsync();
			},

			bindEvents: function () {
				self.collection.on('change', self.render);
				self.collection.on('reset', self.render);
			}
		});

		return new LatestNotesView;
	}
);