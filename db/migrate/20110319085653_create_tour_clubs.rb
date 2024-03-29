class CreateTourClubs < ActiveRecord::Migration
  def self.up
    create_table :tour_clubs do |t|
      t.integer :user_id
      t.boolean :active
      t.string :logo_file_name
      t.string :logo_content_type
      t.integer :logo_file_size
      t.integer :members_count
      t.timestamps
    end

    create_table :tour_club_translations do |t|
      t.integer :tour_club_id
      t.string :locale
      t.string :name
      t.text :description
    end
  end

  def self.down
    drop_table :tour_clubs
    drop_table :tour_club_translations
  end
end
