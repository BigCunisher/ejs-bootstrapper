module.exports = function(rootDir) {
    var module = {};
    module.appConfig = require('./app-config')(rootDir);
    module.routeConfig = require('./route-config');
    module.cacheConfig = require('./cache-config');
    module.clientConfig = require('./client-config')(module.appConfig);
    return module;
};