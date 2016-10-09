var fs = require('fs');
module.exports = function(app, rootDir, frontEnd) {
  app.all('*', function(request, response){
    fs.exists(rootDir + '/client/views/includes/content' + generateDynamicPath(request.path) + '.ejs', function(exists) {
      if(exists){
        response.render(rootDir + '/client/views/index.ejs', {contentName:  generateDynamicPath(request.path)});
      } else {
        response.sendStatus(404);
      }
    });
  });
  function generateDynamicPath(path){
    return path == '/' ? '/home' : path;
  }
}
