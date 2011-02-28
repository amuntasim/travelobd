class CreateFeatures < ActiveRecord::Migration
  def self.up
    create_table :features do |t|
      t.string :name
      t.boolean :for_hotel

      t.timestamps
    end

    create_table :features_hotels, :id => false do |t|
      t.integer :hotel_id
      t.integer :feature_id
    end
    create_table :features_rooms, :id => false do |t|
      t.integer :room_id
      t.integer :feature_id
    end
  end

  def self.down
    drop_table :features
    drop_table :features_hotels
    drop_table :features_rooms
  end
end
