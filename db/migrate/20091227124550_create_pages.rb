class CreatePages < ActiveRecord::Migration
  def self.up
    create_table :pages do |t|
      t.title
      t.text
      
      t.references :addressable, :polymorphic => true
      
      t.timestamps
    end
  end

  def self.down
    drop_table :pages
  end
end
