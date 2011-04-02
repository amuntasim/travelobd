class CreateDivisionTranslations < ActiveRecord::Migration
  def self.up
    Division.create_translation_table! :name=> :string
    remove_columns :divisions, :name
  end

  def self.down
    drop_table :division_translations
    add_column :divisions, :name, :string
  end
end
