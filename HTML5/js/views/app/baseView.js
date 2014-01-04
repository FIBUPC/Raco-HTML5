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

				if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
				    WinJS.UI.Animation.enterPage($('.page')[0]);
				}

				if ($page.hasClass('hide')) {
				    $('#menu-toggle-button').hide();
				    $('#back-button').show();

				    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
				        $('#winBackButton').show();   
				    }

				    $page.removeClass('hide');
					
					$('body').addClass('can-go-back');
				}
				else {
					$('#back-button').hide();
					$('#menu-toggle-button').show();
					$('body').removeClass('can-go-back');

					if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
					    $('#winBackButton').hide();
					}
				}

				if (this.refreshable && this.refresh) {
				    $('#refresh-button').show();
				    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
				        $('#refresh-command').removeAttr('disabled');
				    }

					this.refresh.call(this, false);

					var that = this;
					$('#refresh-button').off('click').on('click', function(e){
						e.preventDefault();
						e.stopPropagation();

						if (!$('#loading-layer').is(':visible')) {
						    that.refresh.call(that, true);
						}

						return false;
					});
				}
				else {
				    $('#refresh-button').off('click').hide();

				    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
				        $('#refresh-command').attr('disabled', 'disabled');
				    }
				}

				this.bindEvents();

				if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
                    // Add tilt effect to clickable elements on Windows 8
				    $('.clickable').off('MSPointerDown MSPointerUp MSPointerOut').each(function(){
				        this.addEventListener('MSPointerDown', function () {
				            WinJS.UI.Animation.pointerDown(this);
				        }, false);
				        this.addEventListener('MSPointerUp', function () {
				            WinJS.UI.Animation.pointerUp(this);
				        }, false);
                        this.addEventListener('MSPointerOut', function () {
				            WinJS.UI.Animation.pointerUp(this);
				        }, false);
				    });
				}
                
				if (!MobileDetector.isWindowsPhone()) {
				    $('.page').height($(window).height() - $('.page').offset().top);
				}
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
				    window.scrollTo(0, 0);

				    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
				        WinJS.Navigation.history.backStack.push(window.location.hash);
				    }
				    window.location.hash = view;
				}, (MobileDetector.isWindows() ? 500 : 0));
			}
		});

		return BaseView;
	}
);