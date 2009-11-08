class CreatePOIs < ActiveRecord::Migration
  def self.up
    create_table :pois do |t|
      t.string :name
      t.integer :latitude
      t.integer :longitude

      t.timestamps
    end
  end

  def self.down
    drop_table :pois
  end
end
