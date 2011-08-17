class CreateCities < ActiveRecord::Migration
  def self.up
    create_table :cities do |t|
      t.integer :country_id
      t.boolean :active

      t.timestamps
    end
    create_table :city_translations do |t|
      t.integer :city_id
      t.string :locale
      t.string :name

      t.timestamps
    end


  end

  def self.down
    drop_table :cities
    drop_table :city_translations
  end
end
