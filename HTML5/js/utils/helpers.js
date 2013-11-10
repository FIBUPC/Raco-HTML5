var Helpers = {
	Environment: {
		isNativeApp: function() {
			// Check if Cordova declaration exists
			return typeof(window.cordova) != 'undefined';
		},
		log: function(message) {
			if (DEBUG && console && console.log) {
				console.log(message);
			}
		}
	},
	Application: {
		setMenuActiveElement: function(element) {
			$menuElement = $(Constants.Application.MenuTabs);

			// Remove all active elements
			$menuElement.find('li').removeClass('active');

			// Find desired element and set it as active
			$targetElement = $menuElement.find(element);
			if ($targetElement.length > 0) {
				$targetElement.addClass('active');
			}
		}
	}
};