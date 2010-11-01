class RenameDirectoriesToSpots < ActiveRecord::Migration
  def self.up
    rename_table(:directories, :spots)
    rename_table(:directory_assets, :spot_assets)
  end

  def self.down
    rename_table(:spots, :directories)
    rename_table(:spot_assets, :directory_assets)
  end
end
