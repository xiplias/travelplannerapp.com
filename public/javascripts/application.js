var locations = new Array;

function addLocation (item) {
  locations.push(item);
  drawMap();
  drawList();
  
  // Find Id of itinerary
  sref = window.location.href.split("/");
  id = sref[sref.length - 1]; 
  
  // Post new location to server
  $.post("/locations", {"location[name]": item.address, "location[latitude]": item.latitude, "location[longitude]": item.longitude ,"location[itinerary_id]": id });
}

function drawList() {
  $("#location_list").html("");
  $(locations).each(function() {
    $("#location_list").append("<li>"+this.address+"</li>");
  });
}

function drawMap() {
  google_map.clearOverlays();
  
  
  var last_entry = new Array;
  var points = locations.length;
  var current = 1;
  
  $(locations).each(function() {
    var latlng = new GLatLng(this.latitude, this.longitude);
    google_map.addOverlay(new GMarker(latlng));

    if(current != 1) {
      var polyline = new GPolyline([
        new GLatLng(last_entry[0], last_entry[1]),
        new GLatLng(this.latitude, this.longitude)
      ], "#ff0000", 10);
      google_map.addOverlay(polyline);
    }
    
    current++;
    
    last_entry = [this.lat, this.lng];
  });
  
  

}

$(document).ready(function(){  
  
  $("#geocoding_suggest").suggest("/locations/find",{
    delay: 300,
		createItems:function(txt) {
			if (typeof JSON!=='undefined' && typeof JSON.parse==='function')
				return JSON.parse(txt);
			else
				return eval('('+ txt +')');
		},
		formatItem:function(item,q) {
			return "<li>"+this.addMatchClass(item.address,q)+"</li>";
		},
		selectItemText:function(item) {
			return item.address;
		},
		onSelect: function(item) {  
			var latlng = new GLatLng(item.latitude, item.longitude);
      google_map.addOverlay(new GMarker(latlng));
      
      addLocation(item);
      $("#geocoding_suggest").val("");
		}
	});

  $("input.focus:first").focus();
  
  $("body").bind("ajaxSend", function(elm, xhr, s) {
    // Set right accept for rails
    xhr.setRequestHeader("Accept", "text/javascript");

    // Inserts auth_token if present
    if (s.type == "GET") { return; }
    if (s.data && s.data.match(new RegExp("\\b" + window._auth_token_name + "="))) return;
      if (s.data) {
      s.data = s.data + "&";
    } else {
      s.data = "";
      // if there was no data, $ didn't set the content-type
      xhr.setRequestHeader("Content-Type", s.contentType);
    }
    s.data = s.data + encodeURIComponent(window._auth_token_name)+ "=" + encodeURIComponent(window._auth_token);
  });
  
  // $.get(window.location.href+"/locations", {
  //   success: function(data) {
  //     drawMap();
  //     drawList();
  //   }
  // });
});

