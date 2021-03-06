/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			pageTitle: t('Rooms'),
			menuElement: '.rooms',

			/**
			 * Initializes the view
			 **/
			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
				
			    self.model = RoomsController.rooms.get(self.options.id);
			},
			
			/**
			 * Renders the view
			 **/
			render: function() {
				var compiledTemplate = _.template(self.template, { room: self.model });
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			}
		});

		return RoomView;
	}
);