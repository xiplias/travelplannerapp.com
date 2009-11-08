class Itinerary < ActiveRecord::Base
  attr_accessible :title
  has_many :locations
  belongs_to :user
end
