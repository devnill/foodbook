
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'FoodBook' });
};
exports.map = function(req, res){
  res.render('map', { title: 'FoodBook' });
};
