class RenameAdToPakcage < ActiveRecord::Migration
  def self.up
    rename_table(:ads, :packages)
    rename_table :ad_assets, :package_assets
    rename_column :package_assets, :ad_id, :package_id

    rename_table :ad_translations, :package_translations
    rename_column :package_translations, :ad_id, :package_id
    rename_table :ad_videos, :package_videos
    rename_column :package_videos, :ad_id, :package_id
  end

  def self.down
    rename_column(:package_videos, :package_id, :ad_id)
    rename_table(:package_videos, :ad_videos)
    rename_column :package_translations, :package_id, :ad_id
    rename_table :package_translations, :ad_translations


    rename_table :package_assets, :ad_assets

    rename_column :package_assets, :package_id, :ad_id
    rename_table(:packages, :ads)

  end
end
