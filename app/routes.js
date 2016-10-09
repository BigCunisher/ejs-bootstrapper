var fs = require('fs');
var NodeCache = require('node-cache');

var cacheTimeout = 300;
var cacheInterval = 100;

var urlCache = new NodeCache({ stdTTL: cacheTimeout, checkperiod: cacheInterval });
var notFoundCache = new NodeCache({ stdTTL: cacheTimeout, checkperiod: cacheInterval });
var contentPath = '/client/views/includes/content';
var contentSuffix = '.ejs';
var headPath = '/client/views/includes/head';
var headSuffix = 'Head.ejs';
var template = '/client/views/index.ejs';

module.exports = function(app, rootDir, frontEnd) {

  app.all('*', function(request, response){
      if(doesResourceExist(rootDir + contentPath + generateDynamicPath(request.path) + contentSuffix, request.path) && doesResourceExist(rootDir + headPath + generateDynamicPath(request.path) + headSuffix, request.path)){
        if(!doesCacheEntryExist(urlCache, request.path)) urlCache.set(request.path, request.path, function(err, success){
          if(err) console.log(request.path + ' failed to be added to URL cache');
        });
        response.render(rootDir + template, {contentName:  generateDynamicPath(request.path)});
      } else {
        if(!doesCacheEntryExist(notFoundCache, request.path)) notFoundCache.set(request.path, request.path, function(err, success){
          if(err) console.log(request.path + ' failed to be added to 404 cache');
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
