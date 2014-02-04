/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['views/app/baseView',
	 'controllers/news/newsController',
	 'text!templates/news/FIBNewTemplate.html'],
	function (BaseView, NewsController, FIBNewTemplate) {
		'use strict';

		var self,
		FIBNewView = BaseView.extend({
			el: '#content',
			template: FIBNewTemplate,

			pageTitle: t('News'),
			menuElement: '.news',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.model = NewsController.fibNews.get(self.options.id);
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, { fibNew: self.model });
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#read-more').on('click', function(e) {
					if (!$('body').hasClass('menu-displayed')) {
						NewsController.openExternal($(this).data('link'));
					}
				});
			}
		});

		return FIBNewView;
	}
);