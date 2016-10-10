var fs = require('fs');
var NodeCache = require('node-cache');


module.exports = function(app, config) {

  var urlCache = new NodeCache({ stdTTL: config.cacheConfig.pageUrlCacheTimeout, checkperiod: config.cacheConfig.pageUrlCacheInterval });
  var notFoundCache = new NodeCache({ stdTTL: config.cacheConfig.pageNotFoundCacheTimeout, checkperiod: config.cacheConfig.pageNotFoundCacheInterval });

  app.all('*', function(request, response){
    var path = generateDynamicPath(request.path);

      if(doesResourceExist(config.clientConfig.contentPath + path + config.clientConfig.contentSuffix, path) && doesResourceExist(config.clientConfig.headPath + path + config.clientConfig.headSuffix, path)){
        if(!doesCacheEntryExist(urlCache, path)) urlCache.set(path, path, function(err, success){
          if(err) console.log(path + ' failed to be added to URL cache');
        });
        response.render(config.clientConfig.index, {
          contentName:  path,
          headSuffix: config.clientConfig.headSuffix
        });
      } else {
        if(!doesCacheEntryExist(notFoundCache, path)) notFoundCache.set(path, path, function(err, success){
          if(err) console.log(path + ' failed to be added to 404 cache');
        });
        response.sendStatus(404);
      }
  });

  function generateDynamicPath(path){
    return path == '/' ? '/home' : path;
  }

  function doesResourceExist(path, uri){
    return !doesCacheEntryExist(notFoundCache, uri) && (doesCacheEntryExist(urlCache, uri) || fs.existsSync(path));
  }

  function doesCacheEntryExist(cache, key){
    try{
      return cache.get(key, true) !== 'undefined';
    } catch(err){
      return false;
    }
  }
}
