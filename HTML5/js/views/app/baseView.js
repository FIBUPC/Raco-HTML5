define(
	['utils/dispatcher'],
	function (Dispatcher) {
		'use strict';

		var BaseView = Backbone.View.extend({
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
				var $page = $('.page');

				if ($page.hasClass('hide')) {
					$('#menu-toggle-button').hide();
					$('#back-button').show();

					$page.removeClass('hide');
				}
				else {
					$('#back-button').hide();
					$('#menu-toggle-button').show();
				}

				if (this.refreshable && this.refresh) {
					$('#refresh-button').show();
					this.refresh.call(this, false);

					var that = this;
					$('#refresh-button').off('click').on('click', function(e){
						e.preventDefault();
						e.stopPropagation();

						that.refresh.call(that, true);

						return false;
					});
				}
				else {
					$('#refresh-button').off('click').hide();
				}

				$('.page').height($(document).height() - $('.page').offset().top);

				this.bindEvents();
			},

			bindEvents: function() {
				if (this.collection) {
					this.collection.on('change', this.render, this);
					this.collection.on('reset', this.render, this);
				}

				if (this.model) {
					this.model.on('change', this.render, this);
					this.model.on('reset', this.render, this);
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