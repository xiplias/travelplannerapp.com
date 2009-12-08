(function($) {
  $.add_location_manager = function(map, options) {
    var t = this;
    t.m = $("#"+map.o.id); // Location of google map v2 div
    t.l = []; // Location Data Array
    t.o = options;
    
    // Add HTML for manager
    m.after("<div class=\"lm_con\"><input class=\"lm_search\" /><ul class=\"lm_list\"></ul></div>");
    // Geocoding Suggest - Add autosuggest to search box
    $(".lm_search").suggest(o.autoSuggestUrl,{ 
      delay: 200,
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
        t.addLocation(item);
        $(".lm_search").val("");
    	}
    });
  };
  
  $.extend($.add_location_manager.prototype, {
    addLocation: function(item) {
      var t = this;
      
      t.locations.push(item);

       // Data Array
      t.drawMap();
      t.drawList();

      // Post new location to server
      $.post(o.pushLocationsToServerUrl, {
        "location[name]": item.address, 
        "location[latitude]": item.latitude, 
        "location[longitude]": item.longitude ,
        "location[itinerary_id]": id 
      });
    },
    
    parseList: function() {
      var temp_list = new Array;
      $("#location_list li").each(function() {
        id = $(this).attr("rel").split("_")[1];
        temp_list.push(locations[id]);
      });

      locations = temp_list;
    },
    
    drawList: function() {
      $("#location_list").html("");

      for(id in locations) {
        $("#location_list").append("<li rel=\"ul_"+id+"\">"+locations[id].address+"<a href=\"#\" class=\"delete_location\">D</a></li>");
      };

      $("ul#location_list").dragsort({ 
        dragSelector: "li", 
        dragEnd: function() { 
          parseList();
          drawMap();
        }, 
        dragBetween: false 
      });

      addClickDelete();
    },
    
    drawMap: function() {
      map.clearOverlays();

      var last_entry = new Array;
      var points = locations.length;
      var current = 1;

      $(locations).each(function() {
        var latlng = new GLatLng(this.latitude, this.longitude);
        map.addOverlay(new GMarker(latlng));

        if(current != 1) {
          var polyline = new GPolyline([
            new GLatLng(last_entry[0], last_entry[1]),
            new GLatLng(this.latitude, this.longitude)
          ], "#ff0000", 10);
          map.addOverlay(polyline);
        }

        current++;

        last_entry = [this.latitude, this.longitude];
      });
    },
    
    addClickDelete: function() {
      $("#location_list li a").each(function () {
        $(this).click(function() {
          $(this).parent().slideUp().remove();
          parseList();
          drawMap();
        });
      });
    }
  });

  $.fn.add_location_manager = function(options) {
  	options = $.extend({
      externalDataAtStartup: false,
      pushLocationsToServerUrl: "/locations",
      autoSuggestUrl: "/locations/find"
  	},options);
    
  	this.each(function() {
  	  new $.add_location_manager(this, options);
  	});
  	
  	return this;
  };
})(jQuery);