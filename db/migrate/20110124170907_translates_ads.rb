class TranslatesAds < ActiveRecord::Migration
  def self.up
    Ad.create_translation_table! :title => :string, :description => :text
    remove_columns :ads, :title, :description
  end

  def self.down
    drop_table :ad_translations
    add_column  :ads, :title, :string
    add_column  :ads, :description, :text
  end

end
