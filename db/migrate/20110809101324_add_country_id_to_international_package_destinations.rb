class AddCountryIdToInternationalPackageDestinations < ActiveRecord::Migration
  def self.up
    add_column :international_package_destinations, :country_id, :integer
  end

  def self.down
    remove_column :international_package_destinations, :country_id
  end
end
