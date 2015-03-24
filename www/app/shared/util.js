packmule.Util = {};

packmule.Util.getWatchers = function(root) {
    root = angular.element(root || document.documentElement);
    function getElemWatchers(element) {
        var isolateWatchers = getWatchersFromScope(element.data().$isolateScope);
        var scopeWatchers = getWatchersFromScope(element.data().$scope);
        var watchers = scopeWatchers.concat(isolateWatchers);
        _.forEach(element.children(), function (childElement) {
            watchers = watchers.concat(getElemWatchers(angular.element(childElement)));
        });
        return watchers;
    }

    function getWatchersFromScope(scope) {
        if (scope) {
            return scope.$$watchers || [];
        } else {
            return [];
        }
    }

    return getElemWatchers(root);
};

packmule.Util.getWatcherLength = function() {
    return packmule.Util.getWatchers().length;
};
