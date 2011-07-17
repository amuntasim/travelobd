class AddActiveToFeatures < ActiveRecord::Migration
  def self.up
    add_column :features, :active, :boolean, :default => true
  end

  def self.down
    remove_column :features, :active
  end
end
