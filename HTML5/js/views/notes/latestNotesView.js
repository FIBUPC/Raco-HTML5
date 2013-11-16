define(
	['controllers/notes/notesController',
	 'text!templates/notes/latestNotesTemplate.html',
	 'utils/dispatcher'],
	function (NotesController, LatestNotesTemplate, Dispatcher) {
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

				$('.page').removeClass('hide');

				self.bindEvents();

				NotesController.getLatestNotesAsync();
			},

			bindEvents: function () {
				self.collection.on('change', self.render);
				self.collection.on('reset', self.render);

				$('#latest-notes li').click(function(e) {
					var $self = $(this);

					Dispatcher.beginInvoke(function(){
						window.location.hash = '#latestNotes/' + $self.data('id');
					});
				});
			}
		});

		return new LatestNotesView;
	}
);