class CreateAds < ActiveRecord::Migration
  def self.up
    create_table :ads do |t|
      t.string :title
      t.integer :category_id
      t.integer :user_id
      t.string :ad_name
      t.string :short_description
      t.float :price
      t.integer :district_id
      t.integer :division_id
      t.string :phone
      t.text :description
      t.boolean :active,:default => true
      t.boolean :featured,:default => false
      t.date :expire_at

      t.timestamps
    end

    add_index(:ads, :user_id)
    add_index(:ads, :featured)
    add_index(:ads, [:category_id, :user_id])
    add_index(:ads, [:district_id,:division_id, :active])
   
    
  end

  def self.down
    drop_table :ads
  end
end
