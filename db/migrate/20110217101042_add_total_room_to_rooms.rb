class AddTotalRoomToRooms < ActiveRecord::Migration
  def self.up
    add_column :rooms, :total_room, :integer
  end

  def self.down
    remove_column :rooms, :total_room
  end
end
