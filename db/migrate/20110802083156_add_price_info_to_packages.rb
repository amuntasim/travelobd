class AddPriceInfoToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :currency, :string
    add_column :package_translations, :price_details, :string
  end

  def self.down
    remove_column :package_translations, :price_details
    remove_column :packages, :currency
  end
end
