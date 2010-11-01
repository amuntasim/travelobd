class AlterAdsAdHeightAndChangeExpireAt < ActiveRecord::Migration
  def self.up
    add_column :ads, :height, :string
    rename_column :ads, :expire_at, :expires_at
  end

  def self.down
    remove_column :ads, :height
    rename_column :ads, :expires_at, :expire_at
  end
end
