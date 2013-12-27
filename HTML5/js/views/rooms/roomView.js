define(
	['views/app/baseView',
	 'controllers/rooms/roomsController',
	 'text!templates/rooms/roomTemplate.html'],
	function (BaseView, RoomsController, RoomTemplate) {
		'use strict';

		var self,
		RoomView = BaseView.extend({
			el: '#content',
			template: RoomTemplate,

			pageTitle: 'Aules',
			menuElement: '.rooms',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
				
			    self.model = RoomsController.rooms.get(self.options.id);
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, { room: self.model });
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			}
		});

		return RoomView;
	}
);