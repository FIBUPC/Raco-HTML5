define(
	['views/app/baseView',
	 'controllers/rooms/roomsController',
	 'text!templates/rooms/roomsTemplate.html'],
	function (BaseView, RoomsController, RoomsTemplate) {
		'use strict';

		var self,
		RoomsView = BaseView.extend({
			el: '#content',
			template: RoomsTemplate,

			pageTitle: 'Rooms',
			menuElement: '.rooms',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
				
			    self.collection = RoomsController.rooms;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {rooms: self.collection.models});
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);

				RoomsController.getRoomsAsync();
			}
		});

		return new RoomsView;
	}
);