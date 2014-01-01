var MobileDetector = { };

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

MobileDetector.isNativeApp = function() {
	// Check if Cordova declaration exists
	if (typeof(APPLICATION) != 'undefined' && APPLICATION) {
		return true;
	}

	return false;
};

MobileDetector.isWindowsPhone = function() {
	return this.getMobileOS() === 'windowsphone';
};

MobileDetector.isIOS = function() {
	return this.getMobileOS() === 'ios';
};

MobileDetector.isWindows = function() {
	return this.getMobileOS() === 'windows';
};