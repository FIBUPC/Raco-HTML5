/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['views/app/baseView',
	 'controllers/news/newsController',
	 'text!templates/news/UPCNewTemplate.html'],
	function (BaseView, NewsController, UPCNewTemplate) {
		'use strict';

		var self,
		UPCNewView = BaseView.extend({
			el: '#content',
			template: UPCNewTemplate,

			pageTitle: t('News'),
			menuElement: '.news',

			/**
			 * Initializes the view
			 **/
			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.model = NewsController.upcNews.get(self.options.id);
			},
			
			/**
			 * Renders the view
			 **/
			render: function() {
				var compiledTemplate = _.template(self.template, { upcNew: self.model });
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			/**
			 * Binds view events
			 **/
			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#read-more').on('click', function(e) {
					if (!$('body').hasClass('menu-displayed')) {
						NewsController.openExternal($(this).data('link'));
					}
				});
			}
		});

		return UPCNewView;
	}
);