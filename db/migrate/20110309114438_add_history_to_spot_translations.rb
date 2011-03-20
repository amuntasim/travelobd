class AddHistoryToSpotTranslations < ActiveRecord::Migration
  def self.up
    add_column :spot_translations, :history, :text
    add_column :spot_translations, :how_to_go, :text
  end

  def self.down
    remove_column :spot_translations, :history
    remove_column :spot_translations, :how_to_go
  end
end
