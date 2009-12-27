class AddOrderToLocationsInItineraries < ActiveRecord::Migration
  def self.up
    add_column :itineraries, :location_order, :string
  end

  def self.down
    remove_column :itineraries, :location_order
  end
end
