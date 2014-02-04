/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

(function(){
	cordova.addConstructor(function(){
		window.plugins.fileBridge = {
			getFileContents: function(path, okCallback, errorCallback) {
				cordova.exec(okCallback, errorCallback, "FileBridge", "getFileContents", { path: path });
			}
		};
	});
})();