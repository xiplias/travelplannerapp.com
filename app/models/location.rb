class Location < ActiveRecord::Base
  acts_as_mappable :default_units => :kms, 
                   :default_formula => :sphere, 
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude
  
  belongs_to :itinerary
  has_many :pois
  
  def self.find_location(query_name)
    result = Geokit::Geocoders::GoogleGeocoder.geocode(query_name)
    
    locations = Array.new
    
    result.all.each do |r|
      locations << [r.full_address, r.lat, r.lng]
    end
    
    locations
  end
end
