
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
	console.log("yo?");
    var handle_response,
        radius,
        food,
        location,
        req_string,
        sort;
    console.log('places');

    console.log(req.query);

    if(req.query.sort!=undefined){
        sort=req.query.sort;
    }
    if(req.query.radius==undefined){
        radius=10000;
    }
    else{
        if(req.body.radius<=50000){
            radius = req.body.radius;
        }
        else{
            radius= 10000;
        }
    }

    if(req.body.food==undefined){
        food='pizza';
    }
    else{
        food=req.body.food;
    }
    if(req.body.location==undefined){
        location='-33.8670522,151.1957362';
    }
    else{
        location=req.body.location;
    }

    req_string='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius='+radius+'&types=food&name='+food+'&sensor=true&key='+api_key;

    handle_response=function(err,response,data){
        if(err===null){
            data=JSON.parse(data);
            var sort = function(data,prop,cb){
                var max_results=3,
                    results=[],
                    best,
                    i,j;
                for(i=0;i<data.results.length;i++){
                    if(results.length<max_results){
                        results.push(data.results[i]);
                    }
                    else{
                        for(j=0;j<results.length;j++){
                            if(results[j][prop]<data.results[i][prop]){
                                results.push(data.results[i]);
                                break;
                            }
                        }
                        if(results.length>max_results){
                            var worst_index=0,
                                worst_val = results[0][prop];

                            for(j=1;j<results.length;j++){
                                if(results[j][prop]<worst_val){
                                    worst_val=results[j][prop];
                                    worst_index=j;
                                }
                            }
                            results.splice(worst_index,1);
                        }
                    }
                }
                console.log(typeof data.results);
                console.log(typeof results);
                console.log(data);
                //cb(data);
                data.results=results;
                res.send(data);

            };


            if(sort!==undefined){
                sort(data,sort);
            }
            else{
                res.send(data);
            }
        }
        else{
            res.send({this_is_cool:false});
        }
    };
    //console.log(req_string);
    request(req_string,handle_response);
};
