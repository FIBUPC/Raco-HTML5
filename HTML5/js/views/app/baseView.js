define(
	['utils/dispatcher'],
	function (Dispatcher) {
		'use strict';

		var BaseView = Backbone.View.extend({
			buttons: ['menu', 'refresh'],
			pageTitle: '',
			menuElement: '',

			initialize: function() {
			},

			wrapRender: function(scope) {
				_.bindAll(scope, 'beforeRender', 'render', 'afterRender');
				scope.render = _.wrap(scope.render, function(render) { 
			    	scope.beforeRender();
			    	render(); 
			    	scope.afterRender(); 

			    	return scope; 
			    });
			},

			beforeRender: function() {
				$(Constants.Application.PageTitle).html(this.pageTitle);
				Helpers.Application.setMenuActiveElement(this.menuElement);
			},

			afterRender: function() {
				$('.page').removeClass('hide');

				this.bindEvents();
			},

			bindEvents: function() {
				if (typeof(this.collection) != 'undefined') {
					this.collection.on('change', this.render);
					this.collection.on('reset', this.render);
				}

				if (typeof(self.model) != 'undefined') {
					this.model.on('change', this.render);
					this.model.on('reset', this.render);
				}
			},

			navigate: function(view) {
				if (typeof(view) == 'undefined' || view === '' || view === '#') {
					return;
				}

				// Navigate on a new thread to avoid freezing effects
				Dispatcher.beginInvoke(function(){
					window.location.hash = view;
				});
			}
		});

		return BaseView;
	}
);