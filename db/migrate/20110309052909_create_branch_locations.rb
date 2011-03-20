class CreateBranchLocations < ActiveRecord::Migration
  def self.up
    create_table :branch_locations do |t|
      t.integer :branchable_id
      t.string :branchable_type
      t.integer :district_id
      t.string :phone

      t.timestamps
    end

    create_table :branch_location_translations do |t|
      t.integer :branch_location_id
      t.string :locale
      t.string :location
      t.string :address
      t.string :phone
    end
  end

  def self.down
    drop_table :branch_locations
    drop_table :branch_location_translations
  end
end
