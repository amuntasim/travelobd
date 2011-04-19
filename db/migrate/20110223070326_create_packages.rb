class CreatePackages < ActiveRecord::Migration
  def self.up
    create_table :packages do |t|
      t.string :title
      t.integer :category_id
      t.integer :user_id
      t.string :short_description
      t.float :price
      t.text :description
      t.boolean :active,:default => true
      t.boolean :featured,:default => false

      t.timestamps
    end

    create_table "package_translations", :force => true do |t|
    t.integer  "package_id"
    t.string   "locale"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "short_description"
    t.string   "location"
    t.string   "price_includes"
    t.string   "price_excludes"
  end
    add_index(:packages, :user_id)
    add_index(:packages, :featured)
    add_index(:packages, [:category_id, :user_id])
  end

  def self.down
    drop_table :packages
    drop_table :package_translations
  end
end
