class RenameDistrictsToDistricts < ActiveRecord::Migration
  def self.up
    rename_table :cities, :districts
    rename_column :districts, :state_id, :division_id
  end

  def self.down
    rename_table :districts, :cities
    rename_column :districts, :division_id, :state_id
  end
end
