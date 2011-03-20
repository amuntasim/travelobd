class AddLatLongToSpots < ActiveRecord::Migration
  def self.up
    add_column :spots, :latitude, :string
    add_column :spots, :longitude, :string
  end

  def self.down
    remove_column :spots, :longitude
    remove_column :spots, :latitude
  end
end
