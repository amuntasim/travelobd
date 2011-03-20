class LocalizeHotels < ActiveRecord::Migration
  def self.up
    create_table :hotel_translations do |t|
      t.integer :hotel_id
      t.string :locale
      t.string :name
      t.text :description
      t.text :address
    end

    remove_columns :hotels, :name, :description, :address
  end

  def self.down
    drop_table :hotel_translations
    add_column :hotels, :name, :string
    add_column :hotels, :description, :text
    add_column :hotels, :address, :text
  end
end
