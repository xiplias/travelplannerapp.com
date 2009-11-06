class CreateItineraries < ActiveRecord::Migration
  def self.up
    create_table :itineraries do |t|
      t.string :title
      t.belongs_to :user
      t.timestamps
    end
  end
  
  def self.down
    drop_table :itineraries
  end
end
