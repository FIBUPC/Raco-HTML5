/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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
		    		self.upcNews.reset(JSON.parse(upcNews));
		    	}
		    	if (fibNews != null) {
		    		self.upcNewsLatestSync = moment(localStorage.getItem('FIB_NEWS_LATEST_SYNC'));
		    		self.fibNews.reset(JSON.parse(fibNews));
		    	}
		    });
	    };

	    NewsController.saveFIBNewsAsync = function(fibNews) {
	    	Dispatcher.beginInvoke(function(){
		    	localStorage.setItem('FIB_NEWS', JSON.stringify(fibNews));
		    	localStorage.setItem('FIB_NEWS_LATEST_SYNC', new Date());
		    });
	    };

	    NewsController.saveUPCNewsAsync = function(upcNews) {
	    	Dispatcher.beginInvoke(function(){
		    	localStorage.setItem('UPC_NEWS', JSON.stringify(upcNews));
		    	localStorage.setItem('UPC_NEWS_LATEST_SYNC', new Date());
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

	    NewsController.getUPCNewsAsync = function () {
	        self.upcNewsLatestSync = moment();

	    	HttpClient.getAsync(String.format(RemoteConfiguration.Urls.News.Upc, Helpers.Environment.getApplicationLanguage()))
	    	.done(function(data) {
	    		data = Helpers.Data.stringToXml(data);
	    		data = Helpers.Data.xmlToJson(data);

	    		self.upcNews.reset(data['rdf:RDF'].item);
	    		self.saveUPCNewsAsync(data['rdf:RDF'].item);

	    		Helpers.Environment.log('UPC news synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving UPC news");
	    	});
	    };

	    NewsController.getFIBNewsAsync = function () {
	        self.fibNewsLatestSync = moment();

	        var currentLanguage = Helpers.Environment.getApplicationLanguage();
	        if (currentLanguage === 'ca') {
	        	currentLanguage = 'fib'; // For some reason we have to use 'fib' instead of 'ca' for news in catalan
	        }
	    	HttpClient.getAsync(String.format(RemoteConfiguration.Urls.News.Fib, currentLanguage))
	    	.done(function(data) {
	    		data = Helpers.Data.stringToXml(data);
	    		data = Helpers.Data.xmlToJson(data);

	    		self.fibNews.reset(data.rss.channel.item);
	    		self.saveFIBNewsAsync(data.rss.channel.item);

	    		Helpers.Environment.log('FIB news synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving FIB news");
	    	});
	    };

	    NewsController.openExternal = function(url) {
	    	if (MobileDetector.isNativeApp()) {
	    		window.plugins.childBrowser.showWebPage(url, function(resp){
	    			
	    		}, function(error) {
	    			
	    		}, true); //opening externally
	    	}
	    	else {
	    		window.open(url, '_blank');
	    	}
	    };
	    
	    return NewsController; // Singleton object, does not require "new" keyword
	}
);