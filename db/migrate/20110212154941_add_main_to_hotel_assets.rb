class AddMainToHotelAssets < ActiveRecord::Migration
  def self.up
    add_column :hotel_assets, :main, :boolean
  end

  def self.down
    remove_column :hotel_assets, :main
  end
end
