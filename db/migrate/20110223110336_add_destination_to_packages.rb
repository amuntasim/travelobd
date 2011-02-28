class AddDestinationToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :destination, :text
  end

  def self.down
    remove_column :packages, :destination
  end
end
