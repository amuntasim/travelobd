class AddLocationToPackageTranslations < ActiveRecord::Migration
  def self.up
    add_column :package_translations, :location, :string
  end

  def self.down
    remove_column :package_translations, :location
  end
end
