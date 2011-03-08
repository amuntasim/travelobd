class AddTextilizeDescriptionToSpotTranslations < ActiveRecord::Migration
  def self.up
    add_column :spot_translations, :textilize_description, :text
  end

  def self.down
    remove_column :spot_translations, :textilize_description
  end
end
