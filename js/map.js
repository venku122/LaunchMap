'use strict'
var map;
var markers = [];
var infowindow;
function init() {
  var mapOptions = {
    //center: {lat: 39.828127, lng: -98.579404 },
    center: {lat: 25 , lng: 0},
    zoom: 2
  };

  map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
  document.querySelector("#search").onclick = loadRocket;
  loadRocket();
  loadAgencies();
  loadFamilies();
  loadTypes();
};

function addMarker(latitude, longitude, title, data) {
      var position = {lat:latitude, lng: longitude};
      var marker = new google.maps.Marker({position: position, map: map});
      marker.setTitle(title);
      var launchData = data;
      //add listener for the click event
      google.maps.event.addListener(marker, 'click', function(e) {
        makeInfoWindow(this.position, this.title);
      });
      google.maps.event.addListener(marker, 'click', function(e) {
      displayInfo(data);
      });
			markers.push(marker);
    };

    function makeInfoWindow(position, msg) {
          //close old InfoWindow if it exists
          if(infowindow) infowindow.close();

          //make new infowindow
          infowindow = new google.maps.InfoWindow( {
            map: map,
            position: position,
            content: "<b>" + msg + "</b>"
          })
        };

function displayInfo(data) {
  var content="";
  var info = document.querySelector('#infoBox');
  //content+= data.id;
  content+="<h2>"+(data.name) + "</h2>";
  info.innerHTML = content;
  console.log(content);
};

function clearMarkers() {
			//close info window if it exists
			if(infowindow) infowindow.close();
			//loop through markers array
			for(var i = 0; i < markers.length; i++) {
				//call .setMap(null) on each marker to remove it from the map
				markers[i].setMap(null);
			}
			//empter or re-initialize markers array
			markers = [];
		};
