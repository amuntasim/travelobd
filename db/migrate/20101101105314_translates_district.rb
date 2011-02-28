class TranslatesDistrict < ActiveRecord::Migration
  def self.up
    District.create_translation_table! :name=> :string
    remove_columns :districts, :name
  end

  def self.down
    drop_table :district_translations
    add_column  :districts, :name, :string
  end
end
