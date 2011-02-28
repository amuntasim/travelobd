class CreateRoomAssets < ActiveRecord::Migration
  def self.up
    create_table :room_assets do |t|
      t.integer :room_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.boolean :main, :default => false
      t.timestamps
    end
    add_index(:room_assets, :room_id)
  end

  def self.down
    drop_table :room_assets
  end
end
