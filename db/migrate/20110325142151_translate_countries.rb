class TranslateCountries < ActiveRecord::Migration
   def self.up
    Country.create_translation_table! :name=> :string
    remove_columns :countries, :name
  end

  def self.down
    drop_table :country_translations
    add_column  :countries, :name, :string
  end
end
