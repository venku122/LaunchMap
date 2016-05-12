'use strict'
var info;
var url;

 function loadRocket() {

  // url = "https://launchlibrary.net/1.1/launch/next/5";
   url = "https://launchlibrary.net/1.1/launch?"
   //limit=100&mode=verbose&sort=desc&rocketid=106";

   //limit
   url+="&limit=100";
   //mode
   url+="&mode=verbose";
   //sort
   url+="&sort=desc";
   //rocketID
   var familyOption = document.querySelector('#family');
   var selectedFamily = familyOption.options[familyOption.selectedIndex].value;
   if(selectedFamily!="All") {
     console.log("not all selected");
     url+="&rocketid=" + selectedFamily;
   }

   //locationID

   //time
   var startTimeOption = document.querySelector('#timeframe');
   var selectedStartTime = startTimeOption.options[startTimeOption.selectedIndex].value;
   if(selectedStartTime!="All") {
     if(selectedStartTime=="Future") url += "&startdate=" +  moment().format('YYYY-MM-DD');
     if(selectedStartTime=="Past") url += "&enddate=" +  moment().format('YYYY-MM-DD');
     if(selectedStartTime=="Today")  url += "&startdate=" +  moment().format('YYYY-MM-DD') +  "&enddate=" +  moment().add(24, 'hours').format('YYYY-MM-DD');
     if(selectedStartTime=="Last Month") url += "&startdate=" + moment().subtract(1, 'month').format('YYYY-MM-DD') + "&enddate=" +  moment().format('YYYY-MM-DD');
     if(selectedStartTime=="This Month") url += "&startdate=" + moment().format('YYYY-MM-DD') + "&enddate=" + moment().add(1, 'month').format('YYYY-MM-DD');
     if(selectedStartTime=="Next Month") url += "&startdate=" + moment().add(1, 'month').format('YYYY-MM-DD') + "&enddate=" + moment().add(2, 'month').format('YYYY-MM-DD');
   }
   // call the web service, and download the file
 		console.log("loading " + url);
 		$.ajax({
 		  dataType: "json",
 		  url: url,
 		  data: null,
 		  success: addLaunches
 		});
 };

 function loadAgencies() {
   url = "https://launchlibrary.net/1.1/agency?mode=verbose&limit=10000";
   console.log("loading " + url);
     $.ajax({
       dataType: "json",
       url: url,
       data: null,
       success: addAgencies
     });
 };
 function loadFamilies() {
   url = "https://launchlibrary.net/1.1/rocket?limit=1000"
   console.log("loading " + url);
     $.ajax({
       dataType: "json",
       url: url,
       data: null,
       success: addFamilies
     });
 };

 function loadTypes() {
   url = "https://launchlibrary.net/1.1/missiontype"
   console.log("loading " + url);
     $.ajax({
       dataType: "json",
       url: url,
       data: null,
       success: addTypes
     });
 };

 function addLaunches(obj) {

   // if there's an error, print a message and return
		if(obj.error){
			var status = obj.status;
			var description = obj.msg;
		    console.log(description + status );
			return; // Bail out
		}

    // if there are no results, print a message and return
		if(obj.count == 0){
			var status = "No results found";
			console.log(status);
			return; // Bail out
		}

    var allLaunches = obj.launches;
    updateList(allLaunches);
    clearMarkers();
    for( var i = 0; i < allLaunches.length; i++) {
      var launchData = allLaunches[i];

      var lat, long, name;

      if(launchData.location.pads!=null) {
        var pad = launchData.location.pads[0];
        if(pad.latitude!=null)   lat = pad.latitude;
        if(pad.longitude!=null)  long = pad.longitude;
      //  location = {lat: , lng: };
      }

      if(launchData.name!=null) {
        name = launchData.name;
      }

      if(lat && long) {
        addMarker(parseInt(lat), parseInt(long), name, launchData);
      }
    }
 };

 function addAgencies(obj) {
   // if there's an error, print a message and return
   if(obj.error){
     var status = obj.status;
     var description = obj.description;
       console.log(description + status );
     return; // Bail out
   }

    // if there are no results, print a message and return
   if(obj.total_items == 0){
     var status = "No results found";
     console.log(status);
     return; // Bail out
   }

    var allAgencies = obj.agencies;
    var html = "<option value=\"All\">All Agencies</option>";
    for(var i = 0; i < allAgencies.length; i++) {
      var agency, value, name;
      agency = allAgencies[i];
      if(agency.id!=null)value = agency.id;
      if(agency.name!=null)name = agency.name;
      html += "<option value = \"";
      html += parseInt(value);
      html += "\">";
      html += name;
      html += "</option>"
      html += "\n";
    }

  //document.querySelector('#agency').innHTML = html;
  document.querySelector("#agency").innerHTML = html;
 };

 function addFamilies(obj) {
   // if there's an error, print a message and return
   if(obj.error){
     var status = obj.status;
     var description = obj.description;
       console.log(description + status );
     return; // Bail out
   }

    // if there are no results, print a message and return
   if(obj.total_items == 0){
     var status = "No results found";
     console.log(status);
     return; // Bail out
   }

    var allFamilies = obj.rockets;
    var html = "<option value=\"All\">All Rockets</option>";
    for(var i = 0; i < allFamilies.length; i++) {
      var family, value, name;
      family = allFamilies[i];
      if(family.id!=null)value = family.id;
      if(family.name!=null)name = family.name;
      html += "<option value = \"";
      html += parseInt(value);
      html += "\">";
      html += name;
      html += "</option>"
      html += "\n";
    }

  //document.querySelector('#agency').innHTML = html;
  document.querySelector("#family").innerHTML = html;
 };

 function addTypes(obj) {
   // if there's an error, print a message and return
   if(obj.error){
     var status = obj.status;
     var description = obj.description;
       console.log(description + status );
     return; // Bail out
   }

    // if there are no results, print a message and return
   if(obj.total_items == 0){
     var status = "No results found";
     console.log(status);
     return; // Bail out
   }

    var allTypes = obj.types;
    var html = "<option value=\"All\">All Mission Types</option>";
    for(var i = 0; i < allTypes.length; i++) {
      var type, value, name;
      type = allTypes[i];
      if(type.id!=null)value = type.id;
      if(type.name!=null)name = type.name;
      html += "<option value = \"";
      html += parseInt(value);
      html += "\">";
      html += name;
      html += "</option>"
      html += "\n";
    }

  //document.querySelector('#agency').innHTML = html;
  document.querySelector("#types").innerHTML = html;
 };

 function updateList(launches) {
   var html = "<h2>List of Launches</h2>";
   for(var i =0; i < launches.length; i++) {
     var launch = launches[i];
     html+="<div class=\"launch\">"
     if(launch.name) html += "<h3>" + launch.name + "</h3>"
     if(launch.net) html+="Launch NET: " + launch.net + "<br/>";
     if(launch.location && launch.location.name) html += "Location: " + launch.location.name + "<br/>";
     if(launch.rocket.name) html += "Launch Vehicle: " + launch.rocket.name;
     html += "</div>"
   }
     document.querySelector("#list").innerHTML = html;
 };
