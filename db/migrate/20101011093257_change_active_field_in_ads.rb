class ChangeActiveFieldInAds < ActiveRecord::Migration
  def self.up
    change_column :ads, :active, :boolean, :default => false
  end

  def self.down
    change_column :ads, :active, :boolean, :default => true
  end
end
