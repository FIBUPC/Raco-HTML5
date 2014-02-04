/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['text!templates/app/headerTemplate.html',
	 'utils/dispatcher'],
	function (HeaderTemplate, Dispatcher) {
		'use strict';

		var self,
		HeaderView = Backbone.View.extend({
			el: '#header',
			template: HeaderTemplate,

			/**
			 * Initializes the view
			 **/
			initialize: function() {
				self = this;
			},


			/**
			 * Renders the view
			 **/
			render: function() {
				Helpers.Environment.showView(self.template, $(self.$el.selector));

				self.bindMenuToggleButton();
				self.bindBackButton();
			},

			/**
			 * Binds menu toggle button events
			 **/
			bindMenuToggleButton: function() {
				var $menuToggleButton = $('#menu-toggle-button');

				$menuToggleButton.on('click', function(e){
					e.preventDefault();
					e.stopPropagation();

					if ($('#loading-layer').is(':visible')) {
					    return false;
					}

					var $body = $('body');
					var $html = $('html');

					if ($body.hasClass('menu-displayed')) {
						//$('#application-wrapper, .page').unbind('click');

						$html.css({
							height: '100%',
							overflow: 'visible'
						});
						$body.removeClass('menu-displayed');
					}
					else {
						$('#application-wrapper, .page').click(function(e){
							if ($body.hasClass('menu-displayed')) {
								e.stopImmediatePropagation();
								e.preventDefault();

								$('#application-wrapper, .page').off('click');
								$menuToggleButton.trigger('click');

								return false;
							}
							else {
								$('#application-wrapper, .page').off('click');
							}
						});

						$html.css({
							height: $('#menu').height(),
							overflow: 'hidden'
						});

						window.scrollTo(0, 0);
						$body.addClass('menu-displayed');
					}

					return false;
				});
			},

			/**
			 * Binds back button events
			 **/
			bindBackButton: function() {
				var $backButton = $('#back-button');

				$backButton.on('click', function(e){
					e.preventDefault();
					e.stopPropagation();

					if (!(MobileDetector.isWindows())) {
					    $('.page').addClass('hide');
					}
					Dispatcher.beginInvoke(function () {
					    if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
					        var previousUrl = WinJS.Navigation.history.backStack.pop();

					        if (previousUrl !== undefined) {
					            window.location.hash = previousUrl;
					        }
					    }
					    else {
					        window.history.back();
					    }   
					}, 500);

					return false;
				});
			}
		});
		
		return HeaderView;
	}
);