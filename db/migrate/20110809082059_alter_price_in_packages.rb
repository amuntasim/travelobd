class AlterPriceInPackages < ActiveRecord::Migration
  def self.up
    rename_column :packages, :price, :price_bdt
    add_column :packages, :price_usd, :float
  end

  def self.down
    rename_column :packages, :price_bdt, :price
    remove_column :packages, :price_usd
  end
end
