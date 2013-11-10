// Cross browser compatibility
if (!window.plugins) {
    window.plugins = { };
}

var libraries = {
	platform: {
		ios: [

		],
		android: [

		],
		windowsphone: [
			'cordova',
			'fileBridge'
		],
		windows: [
			
		]
	}
};

var head = document.getElementsByTagName('head')[0];
function addScript(scriptName) {
	var script = document.createElement('script');
    script.src = scriptName + '.js';
    head.appendChild(script);
}

var mobileOS = MobileDetector.getMobileOS();
// Add platform dependent scripts if application is executing inside a native app
if (MobileDetector.isNativeApp()) {
	for (var j = 0; j < libraries.platform[mobileOS].length; ++j) {
		addScript('js/libraries/platform/' + mobileOS + '/' + libraries.platform[mobileOS][j]);
	}
}

// Add platform dependent stylesheets (both for native applications and browser testing)
if (mobileOS === 'windowsphone') { // Windows Phone and Windows 8 share the same stylesheets
	mobileOS = 'windows';
}

if (mobileOS != 'unknown') {
	var commonPlatformCSS = document.createElement('link');
	commonPlatformCSS.setAttribute('rel', 'stylesheet');
	commonPlatformCSS.setAttribute('href', 'css/platforms/' + mobileOS + '/common.css');
	commonPlatformCSS.setAttribute('media', 'screen');
	head.appendChild(commonPlatformCSS);

	// Add phone platform CSS
	var phonePlatformCSS = document.createElement('link');
	phonePlatformCSS.setAttribute('rel', 'stylesheet');
	phonePlatformCSS.setAttribute('href', 'css/platforms/' + mobileOS + '/phone.css');
	phonePlatformCSS.setAttribute('media', 'screen and (max-width: 480px)');
	head.appendChild(phonePlatformCSS);

	// Add tablet platform CSS
	var tabletPlatformCSS = document.createElement('link');
	tabletPlatformCSS.setAttribute('rel', 'stylesheet');
	tabletPlatformCSS.setAttribute('href', 'css/platforms/' + mobileOS + '/tablet.css');
	tabletPlatformCSS.setAttribute('media', 'screen and (min-width: 481px)');
	head.appendChild(tabletPlatformCSS);
}