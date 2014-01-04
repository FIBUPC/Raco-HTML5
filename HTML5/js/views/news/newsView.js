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

			pageTitle: t('News'),
			menuElement: '.news',
			refreshable: true,

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.upcNews = NewsController.upcNews;
			    self.fibNews = NewsController.fibNews;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template,
					{upcNews: self.upcNews.first(5), fibNews: self.fibNews.first(5)});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				self.upcNews.on('reset', self.render);
				self.upcNews.on('change', self.render);

				self.fibNews.on('reset', self.render);
				self.fibNews.on('change', self.render);

				$('.news.fib li').on('click', function(e) {
					if (!$('body').hasClass('menu-displayed')) {
						self.navigate('#!/news/fib/' + $(this).data('id'));
					}
				});

				$('.news.upc li').on('click', function(e) {
					if (!$('body').hasClass('menu-displayed')) {
						self.navigate('#!/news/upc/' + $(this).data('id'));
					}
				});
			},

			refresh: function(force) {
				NewsController.getNewsAsync(force);
			}
		});

		return new NewsView;
	}
);