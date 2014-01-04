define(
	['text!templates/app/menuTemplate.html'],
	function (MenuTemplate) {

		var self,
		MenuView = Backbone.View.extend({
			el: '#menu',
			template: MenuTemplate,

			initialize: function() {
				self = this;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template);
				self.$el.html(compiledTemplate);

				self.bindEventHandlers();
			},

			bindEventHandlers: function() {
			    $('#menu #tabs li.clickable').click(function (e) {
			        e.preventDefault();
			        e.stopPropagation();

			        if ($('#loading-layer').is(':visible')) {
			            return false;
			        }

			        var that = this;
			        function doAction() {
			            if (MobileDetector.isNativeApp() && MobileDetector.isWindows()) {
			                WinJS.Navigation.history.backStack.push(window.location.hash);
			            }

			            window.location.hash = decodeURI($(that).find('a').attr('href'));

			            if ($('body').hasClass('menu-displayed')) {
			                $('#menu-toggle-button').trigger('click');
			            }
			        }

			        if ($(this).hasClass('logout') && !MobileDetector.isWindowsPhone()) {
			            Helpers.Environment.showConfirmationDialogAsync(t('Are you sure do you want to sign out?'), t('Sign out'))
                            .done(function (result) {
                                if (result) {
                                    doAction();
                                }
                            });
			        }
			        else {
			            doAction();
			        }

					return false;
			    });
			}
		});
		
		return MenuView;
	}
);