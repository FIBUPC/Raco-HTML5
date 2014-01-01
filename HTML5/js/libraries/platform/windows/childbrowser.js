(function () {
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.childBrowser = {};

    window.plugins.childBrowser.showWebPage = function (url, external) {
        window.plugins.childBrowser.openExternal(url);
    };

    window.plugins.childBrowser.openExternal = function (url) {
        Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(url));
    };
})();