class AddDescToLocation < ActiveRecord::Migration
  def self.up
    add_column :locations, :description, :text
  end

  def self.down
    remove_column :locations, :description
  end
end
