class AddShortDescriptionToSpotTranslations < ActiveRecord::Migration
  def self.up
    add_column :spot_translations, :short_description, :string
  end

  def self.down
    remove_column :spot_translations, :short_description
  end
end
