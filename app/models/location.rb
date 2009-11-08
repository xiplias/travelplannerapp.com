class Location < ActiveRecord::Base
  belongs_to :itinerary
  has_many :pois
end
