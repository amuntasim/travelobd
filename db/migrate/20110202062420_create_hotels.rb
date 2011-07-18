class CreateHotels < ActiveRecord::Migration
  def self.up
    create_table :hotels do |t|
      t.string :name
      t.text :description
      t.text :address
      t.integer :district_id
      t.integer :division_id
      t.string :phone
      t.string :email
      t.string :contact_person
      t.integer :user_id
      t.boolean :active, :default => true
      t.boolean :featured, :default => false
      t.integer :rating
      t.timestamps
    end
  end

  def self.down
    drop_table :hotels
  end
end
