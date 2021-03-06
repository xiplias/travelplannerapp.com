(function($) {
  $.add_location_manager = function(map, options) {
    var t = this;
    t.iid = window.location.hash.split("#")[1] //window.location.href.split("/")[window.location.href.split("/").length-1].split("#")[0];
    t.m = map; // Google Map Object
    t.m_con = $("#map")//$("#"+t.m.A.id); // Location of google map v2 div
    t.l = {}; // Location Data Object
    t.order = []; // Order Array
    t.o = options; // Plugin options
    t.nid, t.dragable, t.lastId, t.newest_id
    
    // Add HTML for manager
    $("#left_panel").html("<ul class=\"lm_list\"></ul></div>");
    
    // Geocoding Suggest - Add autosuggest to search box
    $("#lm_search input").suggest(t.o.autoSuggestUrl,{ 
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
        t.sendLocation(item);
        $("#lm_search input").val("");
      }
    });
    
    t.getRemoteLocations();
  };
  
  $.extend($.add_location_manager.prototype, {
    addLocation: function(item, id) {
      var t = this;
      
      if(item.id) {
        var id = item.id;
      }
      
      t.l[id] = item;
      t.order.push(parseFloat(id));
      
      if(id != "") {
        t.l[id].id = id;
      }
    },
    
    sendLocation: function(item) {
      var id, newest_id;
      t = this;
      // Post new location to server
      $.post("/locations", {
        "location[address]": item.address, 
        "location[latitude]": item.latitude, 
        "location[longitude]": item.longitude,
        "location[itinerary_id]": t.iid
      }, function(data) {
        t.addLocation(item, data);
        t.drawMap();
        t.drawList();
      }); 
    },
    
    saveOrder: function() {
      var t = this;
      $.post("/itineraries/"+t.iid, {
        "_method": "put",
        "itinerary[location_order]": ""+t.order+""
      });
    },
    
    remoteDeleteLocation: function(id) {
      $.ajax({
         url: "/locations/"+id,
         type: 'post',
         dataType: 'script',
         data: { '_method': 'delete' }
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
    
    getRemoteLocations: function() {
      var t = this;
      
      $.getJSON(t.o.locationUrl+t.iid+"/locations",
        function(data) {
          $.each(data, function(i, item) {
             t.addLocation(item.location, "");
          });  
          
          t.drawMap();
          t.drawList();
        }
      );
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
          t.saveOrder();
        }, 
        dragBetween: false 
      });

      this.addClickDelete();
    },
    
    drawMap: function() {
      var t = this;
      t.m.clearOverlays();

      var last_entry = new Array();
      var order_length = t.order.length;

      for(i=0;i<order_length;i++) {
        var key = t.order[i];
        var value = t.l[key];
        
        latlng = new GLatLng(value.latitude, value.longitude);

        var marker = t.addMarker(latlng, value);

        if(i != 0) {
          var polyline = new GPolyline([
            new GLatLng(last_entry[0], last_entry[1]),
            new GLatLng(value.latitude, value.longitude)
          ], "#ff0000", 10);
          t.m.addOverlay(polyline);
        }

        last_entry = [value.latitude, value.longitude];
        t.m.addOverlay(marker);
      }
    },
    
    addMarker: function(point, info) {
      var t = this;
      marker = new GMarker(point);
      GEvent.addListener(marker, "click", function(overlat, latlng) {
        t.m.openInfoWindowHtml(point, "<div>"+info.address+"</div><div><a href=\""+window.location.pathname+"/locations/"+info.id+"\" onclick=\"callLocationText("+info.id+");return false;\">Read Wiki Page</a></div>");
      });
      
      return marker;
    },
    
    addClickDelete: function() {
      var t = this;
      $(".lm_list li a").each(function () {
        $(this).click(function() {
          $(this).parent().slideUp().remove();
          t.remoteDeleteLocation(t.l[$(this).parent().attr("rel")].id);
          t.parseList();
          t.drawMap();
          t.drawList();
        });
      });
    },
    
    itineraryId: function() {
      url;
      return url[url.length-1];
    }
  });

  $.fn.add_location_manager = function(options) {
  	options = $.extend({
      externalDataAtStartup: false,
      pushLocationToUrl: "/locations",
      locationUrl: "/itineraries/",
      autoSuggestUrl: "/locations/find"
  	},options);
    
  	this.each(function() {
  	  new $.add_location_manager(this, options);
  	});
  	
  	return this;
  };
})(jQuery);
