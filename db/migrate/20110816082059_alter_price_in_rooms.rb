class AlterPriceInRooms < ActiveRecord::Migration
  def self.up
    rename_column :rooms, :price, :price_bdt
    add_column :rooms, :price_usd, :float
  end

  def self.down
    rename_column :rooms, :price_bdt, :price
    remove_column :rooms, :price_usd
  end
end
