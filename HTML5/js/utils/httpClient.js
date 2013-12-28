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

	    HttpClient.getSignedAsync = function(url, parameters) {
	    	this.showLoading();

	    	var deferred = $.Deferred();

	    	if (!OAuthController.isAuthenticated()) {
	    		throw 'User must be authenticated in order to send an async request.';
	    	}

	    	try
	    	{
	    		var that = this;
	    		Helpers.Environment.log("Requesting " + url);
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

	    HttpClient.postAsync = function(url, parameters) {
	    	this.showLoading();

	    	this.hideLoading();
	    };

	    HttpClient.getAsync = function(url, parameters) {
	    	this.showLoading();

	    	this.hideLoading();
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