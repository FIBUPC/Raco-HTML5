define(
	['text!templates/notes/latestNotesTemplate.html'],
	function (latestNotesTemplate) {
		'use strict';

		var self,
		LatestNotesView = Backbone.View.extend({
			el: '#content',
			template: latestNotesTemplate,

			initialize: function() {
				self = this;
			},
			
			render: function() {	
				console.log(self.$el);
				$(self.$el.selector).html(self.template);

				this.bindEvents();
			},

			bindEvents: function() {
				
			}
		});

		return new LatestNotesView;
	}
);