define(
	['controllers/login/oAuthController',
	 'utils/dispatcher'],
	function(OAuthController, Dispatcher) {
	    var HttpClient = {
	    	loadingLayer: $('#loading-layer'),
	    	cancelLoadingHide: false,
	    	loadingIsGoingToHide: false
	    };

	    HttpClient.initialize = function() {
	    	
	    };

	    HttpClient.signUrl = function(url) {
	    	return OAuthController.oAuthService.signUrl(url);
	    };

	    HttpClient.getSignedAsync = function(url) {
	    	this.showLoading();

	    	var deferred = $.Deferred();

	    	if (!OAuthController.isAuthenticated()) {
	    		throw 'User must be authenticated in order to send an async request.';
	    	}

	    	try
	    	{
	    		var that = this;
		    	OAuthController.oAuthService.get(url, function(data) {
		    		that.hideLoading();
		            deferred.resolve(data.text);
		        }, function(error){
		        	that.hideLoading();
		        	deferred.reject(error);
		        });
	    	}
	    	catch (e) {
	    		deferred.reject(e);
	    	}

	    	return deferred.promise();
	    };

	    HttpClient.postAsync = function(url) {
	    	this.showLoading();

	    	this.hideLoading();
	    };

	    HttpClient.getAsync = function(url) {
	    	this.showLoading();

	    	var deferred = $.Deferred();

	    	try
	    	{
	    		var that = this;

		    	$.get(url).done(function(data) {
		    		that.hideLoading();
		            deferred.resolve(data);
		        }).fail(function(error){
		        	that.hideLoading();
		        	deferred.reject(error);
		        });
	    	}
	    	catch (e) {
	    		deferred.reject(e);
	    	}

	    	return deferred.promise();
	    };

	    HttpClient.readStreamAsync = function(url) {
	    	this.showLoading();

	    	var deferred = $.Deferred();

	    	try {
		    	var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);

				xhr.responseType = 'arraybuffer';

				xhr.onload = function(e) {
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
			catch(e) {
				alert(e);
				deferred.reject(e);
			}

			return deferred.promise();
	    };

	    HttpClient.putSignedAsync = function(url, parameters) {
	    	this.showLoading();

	    	this.hideLoading();
	    };

	    HttpClient.showLoading = function() {
	    	if (this.loadingIsGoingToHide) {
	    		this.cancelLoadingHide = true;
	    	}

	    	this.loadingLayer.fadeIn();
	    };

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