class AddShortDescriptionToAdTranslations < ActiveRecord::Migration
  def self.up
    add_column :ad_translations, :short_description, :string
  end

  def self.down
    remove_column :ad_translations, :short_description
  end
end
