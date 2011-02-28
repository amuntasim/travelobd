class CreateHotelAssets < ActiveRecord::Migration
  def self.up
    create_table :hotel_assets do |t|
      t.integer :hotel_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.timestamps
    end
    add_index(:hotel_assets, :hotel_id)
  end

  def self.down
    drop_table :hotel_assets
  end
end
