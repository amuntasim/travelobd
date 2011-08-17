class CreateInternationalPackageDestinations < ActiveRecord::Migration
  def self.up
    create_table :international_package_destinations do |t|
      t.integer :package_id
      t.integer :city_id
      t.timestamps
    end
    create_table :international_package_destination_translations do |t|
      t.integer :international_package_destination_id
      t.string :locale
      t.string :detail
    end
  end

  def self.down
    drop_table :international_package_destinations
    drop_table :international_package_destination_translations
  end
end
