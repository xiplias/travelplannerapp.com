class ChangeCoordinatesToFloat < ActiveRecord::Migration
  def self.up
    change_column :locations, :latitude, :float
    change_column :locations, :longitude, :float
    
  end

  def self.down
    change_column :locations, :latitude, :integer
    change_column :locations, :longitude, :integer
  end
end
