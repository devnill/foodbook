
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'FoodBook' });
};
exports.map = function(req, res){
  res.render('map', { title: 'FoodBook' });
};
exports.test = function(req,res){
    console.log(req);
};
exports.places = function(req, res){
    var request=require('request'),
        handle_response,
        radius,
        food,
        location,
        req_string;
    console.log('places');
    console.log(req.query);
    if(req.query.radius==undefined){
        radius=10000;
    }
    else{
        radius = req.query.radius;
    }

    if(req.query.food==undefined){
        food='pizza';
    }
    else{
        food=req.query.food;
    }
    if(req.query.location==undefined){
        location='-33.8670522,151.1957362';
    }
    else{
        location=req.query.location;
    }

//    req_string='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius='+radius+'&types=food&name='+food+'&sensor=true&key=AIzaSyAtj8Ryh3t-hUlFkBx2faLB-ohqs6iGkn8';
    req_string='https://haveidoneit.com:8888/test/maps/api/place/nearbysearch/json?location='+location+'&radius='+radius+'&types=food&name='+food+'&sensor=true&key=AIzaSyAtj8Ryh3t-hUlFkBx2faLB-ohqs6iGkn8';

    handle_response=function(results){
        console.log('google says');
        console.log(results);
        res.send({this_is_cool:true});
    };

    request(req_string,handle_response);

//'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=pizza&sensor=true&key=AIzaSyAtj8Ryh3t-hUlFkBx2faLB-ohqs6iGkn8

};
