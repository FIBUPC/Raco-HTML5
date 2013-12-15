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

			pageTitle: 'Aules',
			menuElement: '.rooms',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
				
			    self.collection = RoomsController.rooms;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {buildings: _.groupBy(self.collection.models,
					function(room){
		    			return room.get('nom').substring(0, 2);
		    		})
				});
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