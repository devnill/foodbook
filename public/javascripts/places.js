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
    localStorage[data.search]JSON
};
get = function(search,cb){
    var i,l=localStorage.length,search_type;
    if(search==undefined){
        //show all recent
        search_type='recent';
    }
    else{
        //search for string
        search_type='type';
    }

    for(i=0;i<localStorage.length;i++){
        
    }
    cb();

};

return{
    add:add,
    get:get
};
})();