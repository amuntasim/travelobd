class CreateHotelsSpotsJoinTable < ActiveRecord::Migration
  def self.up
    create_table(:hotels_spots, :id => false) do |t|
      t.integer :hotel_id
      t.integer :spot_id
    end
  end

  def self.down
    drop_table :hotels_spots
  end
end
