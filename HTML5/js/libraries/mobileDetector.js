define(
	[],
	function(){
		var _detectMobileOS = function(){
			var mobileOS = "unknown";
			var $body = $('body');

			// iOS device
			if (navigator.userAgent.match(/iPhone|iPad|iPod/i)){
				mobileOS = "ios";

				try
				{
					if (navigator.standalone) {
						$body.addClass('standalone');
					}
				}
				catch(e) {}
			}
			// Android device
			else if (navigator.userAgent.match(/Android/i)){
				mobileOS = "android";
			}
			// Windows Phone device
			else if (navigator.userAgent.match(/IEMobile/i)){
				mobileOS = "windows";
			}
			// Windows desktop/tablet device
			else if (navigator.userAgent.match(/Tablet\ PC/i)){
				mobileOS = "windows";
			}

			if (mobileOS !== 'unknown') {
				$body.removeClass('browser').addClass(mobileOS);

				// Add common platform CSS
				var commonPlatformCSS = document.createElement('link');
	            commonPlatformCSS.setAttribute('rel', 'stylesheet');
	            commonPlatformCSS.setAttribute('href', 'css/platforms/' + mobileOS + '/common.css');
	            commonPlatformCSS.setAttribute('media', 'screen');
	            document.getElementsByTagName('head')[0].appendChild(commonPlatformCSS);

	            // Add phone platform CSS
				var phonePlatformCSS = document.createElement('link');
	            phonePlatformCSS.setAttribute('rel', 'stylesheet');
	            phonePlatformCSS.setAttribute('href', 'css/platforms/' + mobileOS + '/phone.css');
	            phonePlatformCSS.setAttribute('media', 'screen and (max-width: 480px)');
	            document.getElementsByTagName('head')[0].appendChild(phonePlatformCSS);

	            // Add tablet platform CSS
				var tabletPlatformCSS = document.createElement('link');
	            tabletPlatformCSS.setAttribute('rel', 'stylesheet');
	            tabletPlatformCSS.setAttribute('href', 'css/platforms/' + mobileOS + '/tablet.css');
	            tabletPlatformCSS.setAttribute('media', 'screen and (min-width: 481px)');
	            document.getElementsByTagName('head')[0].appendChild(tabletPlatformCSS);
	        }
		};

		var _detectNativeApp = function(){
			// Check if Cordova declaration exists
			if (Helpers.Environment.isNativeApp()) {
				$('body').removeClass('web').addClass('native');
			}
		};

		return {
			detectMobileOS: _detectMobileOS,
			detectNativeApp: _detectNativeApp
		};
	}
);