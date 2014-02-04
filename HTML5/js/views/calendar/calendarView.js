/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['views/app/baseView',
	 'controllers/calendar/calendarController',
	 'text!templates/calendar/calendarTemplate.html'],
	function (BaseView, CalendarController, CalendarTemplate) {
		'use strict';

		var self,
		CalendarView = BaseView.extend({
			el: '#content',
			template: CalendarTemplate,

			pageTitle: 'Calendari',
			menuElement: '.calendar',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.collection = CalendarController.calendar;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {calendar: self.collection.models});
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);

				//CalendarController.getCalendarAsync();
			}
		});

		return new CalendarView;
	}
);