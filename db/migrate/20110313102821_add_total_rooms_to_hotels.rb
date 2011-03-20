class AddTotalRoomsToHotels < ActiveRecord::Migration
  def self.up
    add_column :hotels, :total_rooms, :integer, :default => 0
  end

  def self.down
    remove_column :hotels, :total_rooms
  end
end
