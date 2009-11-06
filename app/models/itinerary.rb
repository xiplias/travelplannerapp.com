class Itinerary < ActiveRecord::Base
  attr_accessible :title
  
  belongs_to :user
end
