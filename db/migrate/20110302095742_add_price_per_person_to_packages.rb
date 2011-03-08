class AddPricePerPersonToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :price_per_person, :boolean, :default => true
  end

  def self.down
    remove_column :packages, :price_per_person
  end
end
