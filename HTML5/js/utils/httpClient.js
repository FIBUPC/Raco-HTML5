/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['controllers/login/oAuthController',
	 'utils/dispatcher'],
	function(OAuthController, Dispatcher) {
	    var HttpClient = {
	    	loadingLayer: $('#loading-layer'),
	    	cancelLoadingHide: false,
	    	loadingIsGoingToHide: false
	    };

	    /**
		 * Signs an URL with an oAuth signature
		 **/
	    HttpClient.signUrl = function(url) {
	    	return OAuthController.oAuthService.signUrl(url);
	    };

	    /**
		 * Gets the content of an URL after signing it with an oAuth signature
		 **/
	    HttpClient.getSignedAsync = function(url, silent) {
	    	if (!silent) {
	    		this.showLoading();
	    	}

	    	var deferred = $.Deferred();

	    	if (!OAuthController.isAuthenticated()) {
	    		throw 'User must be authenticated in order to send an async request.';
	    	}

	    	try
	    	{
	    		var that = this;
		    	OAuthController.oAuthService.get(url, function(data) {
		    		if (!silent) {
		    			that.hideLoading();
		    		}
		            deferred.resolve(data.text);
		        }, function(error){
		        	if (!silent) {
		        		that.hideLoading();
		        	}
		        	deferred.reject(error);
		        });
	    	}
	    	catch (e) {
	    		deferred.reject(e);
	    	}

	    	return deferred.promise();
	    };

	    /**
		 * Posts and returns the contents of an URL after signing it with an oAuth signature
		 **/
	    HttpClient.postAsync = function(url) {
	    	this.showLoading();

	    	// TODO: method not supported

	    	this.hideLoading();
	    };

	    /**
		 * Gets the contents of an URL
		 **/
	    HttpClient.getAsync = function(url) {
	    	this.showLoading();
	    	
	    	var deferred = $.Deferred();
	    	
	    	try {
	    		var that = this;

	    		var xhr = new XMLHttpRequest();
	    		xhr.open('GET', url, true);

	    		xhr.onreadystatechange = function () {
	    		    if (this.readyState == this.DONE) {
	    		        if (this.status == 200 && this.response) {
	    		            deferred.resolve(this.response);
	    		        }
	    		        else {
	    		            deferred.reject(undefined);
	    		        }

	    		        that.hideLoading();
	    		    }
	    		};

	    		xhr.onerror = function () {
	    		    deferred.reject(undefined);
	    		};

	    		xhr.send();
	    	}
	    	catch (e) {
	    		deferred.reject(e);
	    	}

	    	return deferred.promise();
	    };

	    /**
		 * Gets the contents of a binary resource after signing the URL with an oAuth signature
		 **/
	    HttpClient.readSignedStreamAsync = function(url) {
	    	return this.readStreamAsync(this.signUrl(url));
	    };

	    /**
		 * Gets the contents of a binary resource
		 **/
	    HttpClient.readStreamAsync = function(url) {
	    	this.showLoading();

	    	var deferred = $.Deferred();

	    	try {
	    	    if (!MobileDetector.isWindowsPhone()) {
	    	        var xhr = new XMLHttpRequest();
	    	        xhr.open('GET', url, true);

				    xhr.responseType = 'arraybuffer';

				    xhr.onload = function (e) {
				        if (this.status == 200) {
				            var uInt8Array = new Uint8Array(this.response);
				            var i = uInt8Array.length;
				            var binaryString = new Array(i);
				            while (i--) {
				                binaryString[i] = String.fromCharCode(uInt8Array[i]);
				            }
				            var data = binaryString.join('');
				            var base64 = window.btoa(data);

				            deferred.resolve(base64);
				        }
				        else {
				            deferred.reject(undefined);
				        }
				    };

				    xhr.send();
				}
				else {
	    	        // Windows Phone does not provide support to read binary data with XHR
                    // Use a native bridge instead
	    	        window.plugins.binaryBridge.readStreamAsync(function(response) {
	    	            deferred.resolve(response);
	    	        }, function() {
	    	            deferred.reject(undefined);
	    	        }, { url: url });
				}
			}
	        catch (e) {
				deferred.reject(e);
			}

			return deferred.promise();
	    };

	    /**
		 * Puts and returns the content of an URL after signing it with an oAuth signature
		 **/
	    HttpClient.putSignedAsync = function(url, parameters) {
	    	this.showLoading();

	    	// TODO: method not supported

	    	this.hideLoading();
	    };

	    /**
		 * Shows loading layer
		 **/
	    HttpClient.showLoading = function() {
	    	if (this.loadingIsGoingToHide) {
	    		this.cancelLoadingHide = true;
	    	}

	    	this.loadingLayer.fadeIn();
	    };

	    /**
		 * Hides loading layer
		 **/
	    HttpClient.hideLoading = function() {
	    	this.loadingIsGoingToHide = true;

	    	var that = this;
	    	Dispatcher.beginInvoke(function(){
	    		if (that.loadingIsGoingToHide && !that.cancelLoadingHide) {
	    			that.loadingLayer.fadeOut();
	    		}
	    		else {
	    			that.cancelLoadingHide = false;
	    			Dispatcher.beginInvoke(arguments.callee, 1000);
	    		}
	    	}, 1000);
	    };
	    
	    return HttpClient; 
	}
);