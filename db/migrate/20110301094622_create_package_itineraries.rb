class CreatePackageItineraries < ActiveRecord::Migration
  def self.up
    create_table :package_itineraries do |t|
      t.integer :package_id

      t.timestamps
    end

    create_table :package_itinerary_translations do |t|
      t.integer :package_itinerary_id
      t.string :locale
      t.string :title
      t.text :detail

      t.timestamps
    end


  end

  def self.down
    drop_table :package_itinerarys
    drop_table :package_itinerary_translations
  end
end
