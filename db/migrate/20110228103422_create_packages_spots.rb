class CreatePackagesSpots < ActiveRecord::Migration
  def self.up
    create_table :packages_spots, :id => false do |t|
      t.integer :package_id
      t.integer :spot_id
    end
    add_index :packages_spots, [:package_id, :spot_id]
  end

  def self.down
    drop_table :packages_spots
  end
end
