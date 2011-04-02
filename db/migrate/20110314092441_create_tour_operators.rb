class CreateTourOperators < ActiveRecord::Migration
  def self.up
    create_table :tour_operators do |t|
      t.integer :category_id
      t.integer :user_id
      t.boolean :active
      t.string :logo_file_name
      t.string :logo_content_type
      t.integer :logo_file_size
      t.integer :packages_count
      t.timestamps
    end

    create_table :tour_operator_translations do |t|
      t.integer :tour_operator_id
      t.string :locale
      t.string :name
      t.text :address
      t.text :description
    end
  end

  def self.down
    drop_table :tour_operators
    drop_table :tour_operator_translations
  end
end
