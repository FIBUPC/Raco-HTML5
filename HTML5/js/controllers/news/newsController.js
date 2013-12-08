define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/newsList'],
	function(HttpClient, Dispatcher, NewsList) {
	    'use strict';
	    
	    var self,
	    NewsController = {
	    	upcNews: new NewsList(), //Observable collection
	    	fibNews: new NewsList(), //Observable collection
	    	upcNewsLatestSync: null,
	    	fibNewsLatestSync: null
	    };

	    NewsController.initialize = function() {
	    	self = this;
	    	
	    	self.fetchNewsAsync();
	    };

	    NewsController.fetchNewsAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var upcNews = localStorage.getItem('UPC_NEWS');
		    	var fibNews = localStorage.getItem('FIB_NEWS');
		    	if (upcNews != null) {
		    		self.upcNewsLatestSync = moment(localStorage.getItem('UPC_NEWS_LATEST_SYNC'));
		    		self.upcNews = new NewsList(JSON.parse(upcNews));
		    	}
		    	if (fibNews != null) {
		    		self.upcNewsLatestSync = moment(localStorage.getItem('FIB_NEWS_LATEST_SYNC'));
		    		self.fibNews = new NewsList(JSON.parse(fibNews));
		    	}
		    });
	    };

	    NewsController.getNewsAsync = function(force) {
	    	if (force || self.upcNewsLatestSync == null || (self.upcNewsLatestSync != null && moment().diff(self.upcNewslatestSync)
	    		>= Constants.Application.AutoSyncDelay)) {
	    		NewsController.getUPCNewsAsync();
	    	}

	    	if (force || self.fibNewsLatestSync == null || (self.fibNewsLatestSync != null && moment().diff(self.fibNewslatestSync)
	    		>= Constants.Application.AutoSyncDelay)) {
	    		NewsController.getFIBNewsAsync();
	    	}
	    };

	    NewsController.getUPCNewsAsync = function() {
	    	HttpClient.postSignedAsync(RemoteConfiguration.Urls.News.upc.format("en"))
	    	.done(function(data) {
	    		data = Helpers.Data.stringToXml(data);
	    		data = Helpers.Data.xmlToJson(data);
	    		self.upcNews.reset(data);
	    		self.upcNewsLatestSync = moment();

	    		Helpers.Environment.log('UPC news synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving UPC news");
	    	});
	    };

	    NewsController.getFIBNewsAsync = function() {
	    	HttpClient.postSignedAsync(RemoteConfiguration.Urls.News.fib.format("en"))
	    	.done(function(data) {
	    		data = Helpers.Data.stringToXml(data);
	    		data = Helpers.Data.xmlToJson(data);
	    		self.fibNews.reset(data);
	    		self.fibNewsLatestSync = moment();

	    		Helpers.Environment.log('FIB news synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving FIB news");
	    	});
	    };
	    
	    return NewsController; // Singleton object, does not require "new" keyword
	}
);