class AddLatitudeLongitudeToHotels < ActiveRecord::Migration
  def self.up
    add_column :hotels, :latitude, :string
    add_column :hotels, :longitude, :string
  end

  def self.down
    remove_column :hotels, :longitude
    remove_column :hotels, :latitude
  end
end
