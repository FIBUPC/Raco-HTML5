(function () {
    cordova.addConstructor(function () {
        window.plugins.binaryBridge = {
            readStreamAsync: function (successCallback, errorCallback, options) {
                cordova.exec(successCallback, errorCallback, "BinaryBridge", "readStreamAsync", options);
            }
        };
    });
})();