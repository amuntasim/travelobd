class CreatePackagesDestinations < ActiveRecord::Migration
  def self.up
    create_table :packages_destinations, :id => false do |t|
      t.integer :package_id
      t.integer :district_id
    end
    remove_columns :packages, :destination, :destinations
  end

  def self.down
    drop_table :packages_destinations
    add_column :packages, :destination, :string
    add_column :packages, :destinations, :string
  end
end
