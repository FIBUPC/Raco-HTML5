;(function(cordova) {
	function CordovaModalWebView() {
	}

	CordovaModalWebView.prototype.showWebPage = function(url, successCallback, errorCallback, external) {
		var self = this;
	  	if (!successCallback) {
	  		successCallback = function() {
	  			// No further action required
	  		};
	  	}

	  	if (!errorCallback) {
	  		errorCallback = function() {
	  			
	  		};
	  	}
	  	
	  	if (external) {
	  		external = "external";
	  	}

		cordova.exec(successCallback, errorCallback, "CordovaModalWebView", "showWebPage", [{ url: url, external: external }]);
	};
	
	CordovaModalWebView.prototype.close = function() {
    	cordova.exec(null, null, "CordovaModalWebView", "close", []);
  	};

 	if (!window.plugins) {
 		window.plugins = {};
 	}
 	
	window.plugins.childBrowser = new CordovaModalWebView();
})(window.cordova);