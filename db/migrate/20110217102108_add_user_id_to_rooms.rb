class AddUserIdToRooms < ActiveRecord::Migration
  def self.up
    add_column :rooms, :user_id, :integer
  end

  def self.down
    remove_column :rooms, :user_id
  end
end
