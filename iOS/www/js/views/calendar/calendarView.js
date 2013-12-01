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

			pageTitle: 'Calendar',
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