/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

(function () {
    cordova.addConstructor(function () {
        window.plugins.pushNotifications = {
            openChannel: function () {
                var deferred = $.Deferred();

                cordova.exec(function (channelUri) {
                    deferred.resolve(channelUri);
                }, function () {
                    deferred.reject();
                }, "PushNotificationsBridge", "openChannel", []);

                return deferred.promise();
            },
            closeChannel: function (channelId, channelObject) {
                var deferred = $.Deferred();

                cordova.exec(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                }, "PushNotificationsBridge", "closeChannel", []);

                return deferred.promise();
            }
        };
    });
})();