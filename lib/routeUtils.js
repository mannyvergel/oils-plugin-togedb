exports.applyRoute = function(model, web) {
  var modelName = model.name;
  var app = web.app;

  app.get('/api/togedb/model/' + modelName, function(req, res, next) {

    var syncDt = req.query.syncDt;
    var qParams = {};
    if (syncDt) {
      qParams['lastModDt'] = {$gt: new Date(syncDt)};
    }
    var MyModel = web.models(modelName);
    MyModel
    .find(qParams)
    .select(model.togedb.select.join(" "))
    .sort({lastModDt: -1})
    .limit(20).lean().exec(function(err, recs) {
      var returnObj = {data: recs};
      if (recs && recs.length > 0) {
        returnObj.syncDt = recs[0].lastModDt;

      }
      res.json(returnObj);
    })
  });
}