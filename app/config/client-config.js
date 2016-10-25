module.exports = function(appConfig) {
    var module = {};
    module.contentPath = appConfig.rootDir + '/client/views/includes/content';
    module.contentSuffix = '.' + appConfig.templatingEngine;
    module.headPath = appConfig.rootDir + '/client/views/includes/head';
    module.headSuffix = '-head.' + appConfig.templatingEngine;
    module.index = appConfig.rootDir + '/client/views/index.' + appConfig.templatingEngine;
    module.staticDir = appConfig.rootDir + '/client/static';
    return module;
}