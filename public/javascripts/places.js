console.log('hi');
/*function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
                                  mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
*/

var places = (function(){
var add,get;
add = function(data){
    data.date= new Date().getTime();
    localStorage[localStorage.length]=JSON.stringify(data);
};
get = function(search,cb){
    var i,l=localStorage.length,results=[];
    if(search==undefined){
        //show all recent
        var now = new Date().getTime();
        for(i=0;i<localStorage.length;i++){
            if(now-JSON.parse(localStorage[i]).date<1209600){
                results.push(localStorage[i]);
            }
        }
    }
    else{
        //search for string
        for(i=0;i<localStorage.length;i++){
            if(localStorage[i].search.match(search)||localStorage[i].name.match(search)||localStorage[i].type.match(search)){
                results.push(localStorage[i]);
            }
        }
    }
    cb(results);



};

return{
    add:add,
    get:get
};
})();