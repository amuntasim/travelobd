class TranslateSpot < ActiveRecord::Migration
  def self.up
    Spot.create_translation_table! :name => :string, :detail => :text
    remove_columns :spots, :name, :detail
  end

  def self.down
    drop_table :spot_translations
    add_column  :spots, :name, :string
    add_column  :spots, :detail, :text
  end
end
