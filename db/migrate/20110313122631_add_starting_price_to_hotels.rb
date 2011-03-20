class AddStartingPriceToHotels < ActiveRecord::Migration
  def self.up
    add_column :hotels, :starting_price, :float, :default => 0
  end

  def self.down
    remove_column :hotels, :starting_price
  end
end
