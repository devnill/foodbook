
/*
 * GET home page.
 */
var result_list;
var api_key='AIzaSyBHHr3wne92Rdf0HfmggXVGO4ZHTALBZYs';
var max_results=3;

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




exports.places = function(req, res){
	console.log("yo?");
    var handle_response,
        radius,
        food,
        location,
        req_string,
        sort,
        order;
    console.log('places');

    //console.log(req.query);
    if(req.body.sort!=undefined){
        sort=req.body.sort;
    }

    if(req.body.order!=undefined){
        order=req.body.order;
    }
    else{
        order='asc';
    }

    if(req.body.radius==undefined){
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
        console.log('wat');
        if(err===null){
            console.log(data);
            data=JSON.parse(data);
            var sort = function(data,prop,order){

                    var results=[],
                    best,
                    i,j;

                if(order){
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
                }
                else{
                    for(i=0;i<data.results.length;i++){
                        if(results.length<max_results){
                            results.push(data.results[i]);
                        }
                        else{
                            for(j=0;j<results.length;j++){
                                if(results[j][prop]>data.results[i][prop]){
                                    results.push(data.results[i]);
                                    break;
                                }
                            }
                            if(results.length>max_results){
                                var best_index=0,
                                    best_val = results[0][prop];

                                for(j=1;j<results.length;j++){
                                    if(results[j][prop]>best_val){
                                        best_val=results[j][prop];
                                        best_index=j;
                                    }
                                }
                                results.splice(best_index,1);
                            }
                        }
                    }
                }
                //console.log(typeof data.results);
                //console.log(typeof results);
                //console.log(data);
                //cb(data);
                data.results=results;
                var r,rd=0;
                result_list=data;
                var place_details=function(ref_id,cb){
                    var req_string='https://maps.googleapis.com/maps/api/place/details/json?reference='+ref_id+'&sensor=true&key='+api_key;
                    request(req_string,cb);
                };

                for(r=0;r<data.results.length;r++){
                    var cur=0;
                    place_details(data.results[r].reference,function(err,data,body){
                        console.log(err);
                        if(!err){
                            var fff;
                            body = JSON.parse(body);
                            var phone= body.result.formatted_phone_number;
                            var name= body.result.name;
                            for(fff=0;fff<result_list.results.length;fff++){
                                if(name==result_list.results[fff].name){
                                    result_list.results[fff].phone=phone;
                                    cur++;
                                    console.log(cur);
                                    if(cur==max_results){
                                        res.send(result_list);
                                    }
                                }
                            }
                        }
                        else{
                            console.log('dddd');
                        }
                    });
                }

            };


            if(sort!==undefined){
                if(order!='asc'){
                    sort(data,sort);
                }
                else{
                    sort(data,sort,true);
                }
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
