define(
	['views/app/baseView',
	 'controllers/timetable/timetableController',
	 'text!templates/timetable/timetableTemplate.html'],
	function (BaseView, TimetableController, TimetableTemplate) {
		'use strict';

		var self,
		TimetableView = BaseView.extend({
			el: '#content',
			template: TimetableTemplate,

			pageTitle: 'Timetable',
			menuElement: '.timetable',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.collection = TimetableController.timetable;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {timetable: self.collection.models});
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
				
				TimetableController.getTimetableAsync();
			}
		});

		return new TimetableView;
	}
);