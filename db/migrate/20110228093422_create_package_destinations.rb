class CreatePackagesDestinations < ActiveRecord::Migration
  def self.up
    create_table :packages_destinations, :id => false do |t|
      t.integer :package_id
      t.integer :district_id
    end
  end

  def self.down
    drop_table :packages_destinations
  end
end
