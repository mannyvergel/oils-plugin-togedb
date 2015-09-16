var path = require('path');
var routeUtils = require('./routeUtils.js');
module.exports = function(pluginConf, web, next) {
  var modelsDir = web.conf.baseDir + web.conf.modelsDir;
  var fileUtils = web.fileUtils;
  var stringUtils = web.stringUtils;
  fileUtils.recurseDir(modelsDir, function (err, opts) {
    if (!opts.isDirectory() && stringUtils.endsWith(opts.file, '.js')) {
      var modelJs = opts.file;
      var model = require(path.resolve(modelsDir, modelJs));


      if (model.togedb && model.togedb.sync) {
        routeUtils.applyRoute(model, web);
      }
      
    }
  });

  next();
}