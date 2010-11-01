class CreateSavedListings < ActiveRecord::Migration
  def self.up
    create_table :saved_listings do |t|
      t.integer :user_id
      t.integer :savable_id
      t.string :savable_type

      t.timestamps
    end
  end

  def self.down
    drop_table :saved_listings
  end
end
