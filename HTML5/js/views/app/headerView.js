define(
	['text!templates/app/headerTemplate.html'],
	function (HeaderTemplate) {
		'use strict';

		var self,
		HeaderView = Backbone.View.extend({
			el: '#header',
			template: HeaderTemplate,

			initialize: function() {
				self = this;
			},

			render: function() {
				self.$el.html(self.template);
			}
		});
		
		return HeaderView;
	}
);