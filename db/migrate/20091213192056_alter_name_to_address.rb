class AlterNameToAddress < ActiveRecord::Migration
  def self.up
    rename_column :locations, :name, :address
  end

  def self.down
    rename_column :locations, :address, :name
  end
end
