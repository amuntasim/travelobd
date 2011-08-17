class AddIndexToCities < ActiveRecord::Migration
  def self.up
    add_index :cities, :country_id
    add_index :city_translations, [:city_id, :locale]
  end

  def self.down
    remove_index :cities, :country_id
    remove_index :city_translations, [:city_id, :locale]
  end
end
