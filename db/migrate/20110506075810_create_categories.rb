class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
      t.string :parent
      t.timestamps
    end
    create_table :category_translations do |t|
      t.column :category_id, :integer
      t.column :locale, :string
      t.column :title, :string
    end
    add_index :category_translations, [:category_id, :locale]
  end

  def self.down
    drop_table :categories
    drop_table :category_translations

  end
end