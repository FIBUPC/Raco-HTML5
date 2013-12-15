define(
	['views/app/baseView',
	 'controllers/news/newsController',
	 'text!templates/news/newsTemplate.html'],
	function (BaseView, NewsController, NewsTemplate) {
		'use strict';

		var self,
		NewsView = BaseView.extend({
			el: '#content',
			template: NewsTemplate,

			pageTitle: 'Notícies',
			menuElement: '.news',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.upcNews = NewsController.upcNews;
			    self.fibNews = NewsController.fibNews;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template,
					{upcNews: self.upcNews.first(5), fibNews: self.fibNews.first(5)});
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
				
				NewsController.getNewsAsync();
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				self.upcNews.on('reset', self.render);
				self.upcNews.on('change', self.render);

				self.fibNews.on('reset', self.render);
				self.fibNews.on('change', self.render);

				$('.news li').on('click', function(e) {
					NewsController.openExternal($(this).data('link'));
				});
			}
		});

		return new NewsView;
	}
);