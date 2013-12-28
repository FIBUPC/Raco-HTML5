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
			refreshable: true,

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
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('.rooms li').on('click', function(e){
					e.preventDefault();
					e.stopPropagation();

					self.navigate('#!/rooms/' + $(this).data('id'));

					return false;
				});
			},

			refresh: function(force) {
				RoomsController.getRoomsAsync(force);
			}
		});

		return new RoomsView;
	}
);