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
        try {
            channelObject.close();
        }
        catch (e) {
            // Ignore this exception
        }
    };
})();