/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

var MobileDetector = { };

/**
 * Gets the current mobile operating system
 **/
MobileDetector.getMobileOS = function() {
	var mobileOS = "unknown";

	// iOS device
	if (navigator.userAgent.match(/iPhone|iPad|iPod/i)){
		mobileOS = "ios";
	}
	// Android device
	else if (navigator.userAgent.match(/Android/i)){
		mobileOS = "android";
	}
	// Windows Phone device
	else if (navigator.userAgent.match(/IEMobile/i)){
		mobileOS = "windowsphone";
	}
	// Windows desktop/tablet device
	else if (navigator.userAgent.match(/MSAppHost/i)) {
		mobileOS = "windows";
	}

    return mobileOS;
};

/**
 * Gets whether the app is currently being executed within a native package
 **/
MobileDetector.isNativeApp = function() {
	// Check if Cordova declaration exists
	if (typeof(APPLICATION) != 'undefined' && APPLICATION) {
		return true;
	}

	return false;
};

/**
 * Gets whether the current mobile platform is Windows Phone
 **/
MobileDetector.isWindowsPhone = function() {
	return this.getMobileOS() === 'windowsphone';
};

/**
 * Gets whether the current mobile platform is iOS
 **/
MobileDetector.isIOS = function() {
	return this.getMobileOS() === 'ios';
};

/**
 * Gets whether the current mobile platform is Windows
 **/
MobileDetector.isWindows = function() {
	return this.getMobileOS() === 'windows';
};

/**
 * Gets whether the current mobile platform is Android
 **/
MobileDetector.isAndroid = function() {
	return this.getMobileOS() === 'android';
};