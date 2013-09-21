
/*
 * GET home page.
 */

var api_key='AIzaSyBHHr3wne92Rdf0HfmggXVGO4ZHTALBZYs';
var request=require('request');


exports.index = function(req, res){
  res.render('index', { title: 'FoodBook' });
};
exports.map = function(req, res){
  res.render('map', { title: 'FoodBook' });
};
exports.test = function(req,res){
    console.log(req);
};


var place_details=function(ref_id,cb){
    var req_string='https://maps.googleapis.com/maps/api/place/details/json?reference='+ref_id+'&sensor=true&key='+api_key;
    request(req_string,cb);
};


exports.places = function(req, res){
    var handle_response,
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
        if(req.query.radius<=50000){
            radius = req.query.radius;
        }
        else{
            radius= 10000;
        }
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

    req_string='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius='+radius+'&types=food&name='+food+'&sensor=true&key='+api_key;

    handle_response=function(err,response,data){
        if(err===null){
            console.log(typeof data); 
            data=JSON.parse(data);
            console.log(data.results);
            var i,
                l=data.results.length;

            //for(i=0;i<l;i++){
              //  console.log(data.results[i].reference);
            //}
            res.send(data);

        }
        else{
            res.send({this_is_cool:false});
        }
    };
    console.log(req_string);
    request(req_string,handle_response);
};
