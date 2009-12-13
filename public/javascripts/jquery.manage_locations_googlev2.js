(function($) {
  $.add_location_manager = function(map, options) {
    var t = this;
    t.m = map; // Google Map Object
    t.m_con = $("#"+t.m.o.id); // Location of google map v2 div
    t.l = {}; // Location Data Object
    t.order = [] // Order Array
    t.o = options; // Plugin options
    t.dragable;
    
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
      var uuid = "uuid_"+Math.uuid(6,15);
      t.l[uuid] = item;
      t.order.push(uuid);
      
      // Draw Interface
      t.drawMap();
      t.drawList();
      
      

      // Post new location to server
      $.post(t.o.pushLocationsToServerUrl, {
        "location[name]": item.address, 
        "location[latitude]": item.latitude, 
        "location[longitude]": item.longitude ,
        "location[itinerary_id]": 1 
      });
    },
    
    parseList: function() {
      var t = this;
      var temp_list = [];
      var ta = [];
      $(".lm_list li").each(function() {
        var id = $(this).attr("rel");
        temp_list.push(id);
      });


      t.order = temp_list;
    },
    
    drawList: function() {
      var t = this;
      $(".lm_list").html("");
      for(i=0;i<t.order.length;i++) {
        key = t.order[i];
        value = t.l[key];
        $(".lm_list").append("<li rel=\""+key+"\">"+value.address+"<a href=\"#\" class=\"delete_location\">D</a></li>");
      }

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
      var order_length = t.order.length;
      
      for(i=0;i<order_length;i++) {
        key = t.order[i];
        value = t.l[key];
        
        var latlng = new GLatLng(value.latitude, value.longitude);
        t.m.addOverlay(new GMarker(latlng));

        if(i != 0) {
          var polyline = new GPolyline([
            new GLatLng(last_entry[0], last_entry[1]),
            new GLatLng(value.latitude, value.longitude)
          ], "#ff0000", 10);
          t.m.addOverlay(polyline);
        }

        last_entry = [value.latitude, value.longitude];
      }
    },
    
    addClickDelete: function() {
      var t = this;
      $(".lm_list li a").each(function () {
        $(this).click(function() {
          $(this).parent().slideUp().remove();
          t.parseList();
          t.drawMap();
          t.drawList();
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