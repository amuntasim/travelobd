class CreateClassifieds < ActiveRecord::Migration
  def self.up
    create_table :classifieds do |t|
      t.integer :category_id
      t.string :name
      t.text :detail
      t.integer :district_id
      t.integer :division_id
      t.integer :country_id
      t.string :zip_code
      t.string :phone
      t.integer :user_id
      t.boolean :active, :default => true

      t.timestamps
    end

    add_index(:classifieds, :user_id)
    add_index(:classifieds, [:category_id, :user_id])
    add_index(:classifieds, [:division_id, :district_id, :active])
    add_index(:classifieds, [:zip_code, :active])
  end

  def self.down
    drop_table :classifieds
  end
end
