class CreatePolymorphicCategories < ActiveRecord::Migration
  def self.up
    create_table :polymorphic_categories do |t|
      t.integer :categorizable_id
      t.string :categorizable_type
      t.integer :category_id
      t.timestamps
    end
    remove_column :hotels, :category_id
    remove_column :packages, :category_id
    remove_column :tour_operators, :category_id
    remove_column :transports, :category_id
    remove_column :spots, :category_id

  end

  def self.down
    drop_table :polymorphic_categories
    add_column :hotels, :category_id, :integer
    add_column :packages, :category_id, :integer
    add_column :tour_operators, :category_id, :integer
    add_column :transports, :category_id, :integer
    add_column :spots, :category_id, :integer
  end
end
