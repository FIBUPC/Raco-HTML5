/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			pageTitle: t('Rooms'),
			menuElement: '.rooms',
			refreshable: true,

			/**
			 * Initalizes the view
			 **/
			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);
				
			    self.collection = RoomsController.rooms;
			},
			
			/**
			 * Renders the view
			 **/
			render: function () {
				var compiledTemplate = _.template(self.template, {buildings: _.groupBy(self.collection.models,
					function(room){
		    			return room.get('nom').substring(0, 2);
		    		}),
					maps: RoomsController.maps
				});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			/**
			 * Callback for after render event
			 **/
			afterRender: function() {
				BaseView.prototype.afterRender.call(self);	
			},

			/**
			 * Binds view events
			 **/
			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('.rooms li').on('click', function(e){
					e.preventDefault();
					e.stopPropagation();

					if (!$('body').hasClass('menu-displayed')) {
						self.navigate('#!/rooms/' + $(this).data('id'));
					}

					return false;
				});
			},

			/**
			 * Refreshes view contents
			 **/
			refresh: function(force) {
				RoomsController.getRoomsAsync(force);
			}
		});

		return new RoomsView;
	}
);