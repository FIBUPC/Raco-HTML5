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

			pageTitle: 'Notícies',
			menuElement: '.news',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.model = NewsController.fibNews.get(self.options.id);
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, { fibNew: self.model });
				$(self.$el.selector).html(compiledTemplate);
			},

			afterRender: function() {
				BaseView.prototype.afterRender.call(self);
			},

			bindEvents: function() {
				BaseView.prototype.bindEvents.call(self);

				$('#read-more').on('click', function(e) {
					NewsController.openExternal($(this).data('link'));
				});
			}
		});

		return FIBNewView;
	}
);