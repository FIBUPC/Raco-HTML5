/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

(function () {
    cordova.addConstructor(function () {
        window.plugins.binaryBridge = {
            readStreamAsync: function (successCallback, errorCallback, options) {
                cordova.exec(successCallback, errorCallback, "BinaryBridge", "readStreamAsync", options);
            }
        };
    });
})();