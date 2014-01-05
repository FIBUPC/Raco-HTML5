(function () {
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.pushNotifications = {};

    window.plugins.pushNotifications.openChannel = function () {
        var deferred = $.Deferred();

        Windows.Networking.PushNotifications
            .PushNotificationChannelManager.createPushNotificationChannelForApplicationAsync()
            .then(function (newChannel) {
                deferred.resolve(newChannel.uri, newChannel);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise();
    };

    window.plugins.pushNotifications.closeChannel = function (channelId, channelObject) {
        var deferred = $.Deferred();

        setTimeout(function(){
            try {
                channelObject.close();
                deferred.resolve();
            }
            catch (e) {
                // Ignore this exception
                deferred.reject();
            }
        }, 0);

        return deferred.promise();
    };
})();