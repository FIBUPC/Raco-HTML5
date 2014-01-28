define(
	['text!templates/app/menuTemplate.html',
	 'controllers/login/loginController'],
	function (MenuTemplate, LoginController) {

		var self,
		MenuView = Backbone.View.extend({
			el: '#menu',
			template: MenuTemplate,

			initialize: function() {
				self = this;

				self.model = LoginController.currentUser;
			},
			
			render: function() {
				var compiledTemplate = _.template(self.template, {currentUser: self.model});
				Helpers.Environment.showView(compiledTemplate, $(self.$el.selector));

				self.bindEventHandlers();

				self.afterRender();
			},

			afterRender: function() {
				if (!self.model.get('nom')) {
					LoginController.getCurrentUserDataAsync(true);
				}
			},

			bindEventHandlers: function() {
				self.model.on('change', this.render, this);
				self.model.on('reset', this.render, this);

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