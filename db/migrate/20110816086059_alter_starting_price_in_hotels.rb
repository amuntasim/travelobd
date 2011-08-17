class AlterStartingPriceInHotels < ActiveRecord::Migration
  def self.up
    rename_column :hotels, :starting_price, :starting_price_bdt
    add_column :hotels, :starting_price_usd, :float
  end

  def self.down
    rename_column :hotels, :starting_price_bdt, :starting_price
    remove_column :hotels, :starting_price_usd
  end
end
