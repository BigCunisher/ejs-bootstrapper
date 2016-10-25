const fs = require('fs');
const NodeCache = require('node-cache');


module.exports = function(app, config) {

    const urlCache = new NodeCache({
        stdTTL: config.cacheConfig.pageUrlCacheTimeout,
        checkperiod: config.cacheConfig.pageUrlCacheInterval
    });
    const notFoundCache = new NodeCache({
        stdTTL: config.cacheConfig.pageNotFoundCacheTimeout,
        checkperiod: config.cacheConfig.pageNotFoundCacheInterval
    });

    app.all('*', (request, response) => {
        const path = generateDynamicPath(request.path);
        if (doesResourceExist(config.clientConfig.contentPath + path + config.clientConfig.contentSuffix, path) && doesResourceExist(config.clientConfig.headPath + path + config.clientConfig.headSuffix, path)) {
            addCacheEntry(urlCache, path, ' failed to be added to URL cache');
            renderTemplate(response, path);
        } else {
            addCacheEntry(notFoundCache, path, ' failed to be added to 404 cache');
            response.sendStatus(404);
        }
    });

    function renderTemplate(response, path) {
        response.render(config.clientConfig.index, {
            contentName: path,
            headSuffix: config.clientConfig.headSuffix
        });
    }

    function addCacheEntry(cache, path, errorMsg) {
        if (!doesCacheEntryExist(cache, path)) cache.set(path, path, (err, success) => {
            if (err) console.log(path + errorMsg);
        });
    }

    function generateDynamicPath(path) {
        return path == '/' ? '/home' : path;
    }

    function doesResourceExist(path, uri) {
        return !doesCacheEntryExist(notFoundCache, uri) && (doesCacheEntryExist(urlCache, uri) || fs.existsSync(path));
    }

    function doesCacheEntryExist(cache, key) {
        try {
            return cache.get(key, true) !== 'undefined';
        } catch (err) {
            return false;
        }
    }
}
