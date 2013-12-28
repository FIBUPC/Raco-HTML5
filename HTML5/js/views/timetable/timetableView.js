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

			pageTitle: 'Horari',
			menuElement: '.timetable',
			refreshable: true,

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.model = TimetableController.timetable;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {timetable: self.model});
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			refresh: function(force) {
				TimetableController.getTimetableAsync(force);
			}
		});

		return new TimetableView;
	}
);