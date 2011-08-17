class AddPackageTypeToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :package_type, :string
  end

  def self.down
    remove_column :packages, :package_type
  end
end
