class AddWhereToStayToSpotTranslations < ActiveRecord::Migration
  def self.up
    add_column :spot_translations, :where_to_stay, :text
  end

  def self.down
    remove_column :spot_translations, :where_to_stay
  end
end
