/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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

			pageTitle: t('Timetable'),
			menuElement: '.timetable',
			refreshable: true,

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.model = TimetableController.timetable;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {
					timetable: self.model,
					subjects: TimetableController.subjects
				});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			refresh: function(force) {
				TimetableController.getTimetableAsync(force);
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#next-day').on('click', function(e){
					if (!$('body').hasClass('menu-displayed')) {
						e.preventDefault();
						e.stopPropagation();

						var $timetableCurrent = $('.timetable .current');
						if ($timetableCurrent.index() === 5) {
							// Go back to Monday
							$timetableCurrent.removeClass('current');
							$('.timetable tr th:nth-child(2), .timetable tr td:nth-child(2)').addClass('current');
						}
						else {
							// Go to next day
							$timetableCurrent.removeClass('current').next().addClass('current');
						}

						return false;
					}
				});

				$('#previous-day').on('click', function(e){
					e.preventDefault();
					e.stopPropagation();

					var $timetableCurrent = $('.timetable .current');
					if ($timetableCurrent.index() === 1) {
						// Go back to Friday
						$timetableCurrent.removeClass('current');
						$('.timetable tr th:nth-child(6), .timetable tr td:nth-child(6)').addClass('current');
					}
					else {
						// Go to previous day
						$timetableCurrent.removeClass('current').prev().addClass('current');
					}

					return false;
				});
			}
		});

		return new TimetableView;
	}
);