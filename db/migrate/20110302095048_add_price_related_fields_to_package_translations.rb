class AddPriceRelatedFieldsToPackageTranslations < ActiveRecord::Migration
  def self.up
    add_column :package_translations, :price_includes, :string
    add_column :package_translations, :price_excludes, :string
    add_column :package_translations, :company, :string
  end

  def self.down
    remove_column :package_translations, :price_includes
    remove_column :package_translations, :price_excludes
    remove_column :package_translations, :company
  end
end
