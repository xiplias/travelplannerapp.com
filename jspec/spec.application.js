describe 'Google Maps Location Manager'
  before_each
    // Google Maps
    $("body").after($("div").addClass("testmap"));
    
    //var map = new GMap2($(".testmap"));
    //map.setCenter(new GLatLng(51.520832, -0.140133), 2);
    //map.setUIToDefault();
       
    //$(map).add_location_manager();
  end
  
  describe '.addLocation()'
    it 'should add marker to map'
      $(".testmap").length.should == 1
    end
  end
end