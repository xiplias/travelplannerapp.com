var localtests = {
	test_another_example : function()
	{
		module("Manage Locations");
		test("test if mapdiv exist", function() 
		{
		  equals(1, location_manager., "We expect value to be 1" );
		});
	}
};

$().extend(tests, localtests);