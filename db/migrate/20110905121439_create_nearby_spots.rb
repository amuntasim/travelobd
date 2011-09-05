class CreateNearbySpots < ActiveRecord::Migration
  def self.up
    create_table :nearby_spots, :id => false do |t|
      t.integer :spot_id
      t.integer :nearby_spot_id
    end
  end

  def self.down
    drop_table :nearby_spots
  end
end
