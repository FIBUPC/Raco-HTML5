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

			pageTitle: 'Notícies',
			menuElement: '.news',

			initialize: function() {
				self = this;
				BaseView.prototype.wrapRender.call(self, self);

			    self.model = NewsController.upcNews.get(self.options.id);
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, { upcNew: self.model });
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

		return UPCNewView;
	}
);