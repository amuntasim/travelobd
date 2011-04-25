class AddSloganToTourClubTranslations < ActiveRecord::Migration
  def self.up
    add_column :tour_club_translations, :slogan, :string
  end

  def self.down
    remove_column :tour_club_translations, :slogan
  end
end
