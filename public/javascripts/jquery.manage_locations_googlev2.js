(function($) {
  $.add_location_manager = function(map, options) {
    var t = this;
    t.m = map;
    t.m_con = $("#"+t.m.o.id); // Location of google map v2 div
    t.l = []; // Location Data Array
    t.o = options;
    
    // Add HTML for manager
    t.m_con.after("<div class=\"lm_con\">Search Location:<input class=\"lm_search\" size=\"26\" /><ul class=\"lm_list\"></ul></div>");
    // Geocoding Suggest - Add autosuggest to search box
    $(".lm_search").suggest(t.o.autoSuggestUrl,{ 
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
      
      t.l.push(item);

       // Data Array
      t.drawMap();
      t.drawList();

      // Post new location to server
      $.post(t.o.pushLocationsToServerUrl, {
        "location[name]": item.address, 
        "location[latitude]": item.latitude, 
        "location[longitude]": item.longitude ,
        "location[itinerary_id]": id 
      });
    },
    
    parseList: function() {
      var t = this;
      var temp_list = [];
      $(".lm_list li").each(function() {
        id = $(this).attr("rel").split("_")[1];
        alert(t.l[id].address);
        temp_list.push(t.l[id]);
      });
      console.log(temp_list);
      t.l = temp_list;
    },
    
    drawList: function() {
      var t = this;
      $(".lm_list").html("");

      for(id in t.l) {
        $(".lm_list").append("<li rel=\"ul_"+id+"\">"+t.l[id].address+"<a href=\"#\" class=\"delete_location\">D</a></li>");
      };

      $("ul.lm_list").dragsort({ 
        dragSelector: "li", 
        dragEnd: function() { 
          t.parseList();
          t.drawMap();
        }, 
        dragBetween: false 
      });

      this.addClickDelete();
    },
    
    drawMap: function() {
      t = this;
      t.m.clearOverlays();

      var last_entry = new Array;
      var points = t.l.length;
      var current = 1;

      $(t.l).each(function() {
        var latlng = new GLatLng(this.latitude, this.longitude);
        t.m.addOverlay(new GMarker(latlng));

        if(current != 1) {
          var polyline = new GPolyline([
            new GLatLng(last_entry[0], last_entry[1]),
            new GLatLng(this.latitude, this.longitude)
          ], "#ff0000", 10);
          t.m.addOverlay(polyline);
        }

        current++;

        last_entry = [this.latitude, this.longitude];
      });
    },
    
    addClickDelete: function() {
      $(".lm_list li a").each(function () {
        $(this).click(function() {
          $(this).parent().slideUp().remove();
          t.parseList();
          t.drawMap();
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