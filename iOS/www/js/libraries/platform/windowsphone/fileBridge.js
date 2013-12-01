(function(){
	cordova.addConstructor(function(){
		window.plugins.fileBridge = {
			getFileContents: function(path, okCallback, errorCallback) {
				cordova.exec(okCallback, errorCallback, "FileBridge", "getFileContents", { path: path });
			}
		};
	});
})();