class CreateLineItems < ActiveRecord::Migration
  def self.up
    create_table :line_items do |t|
      t.float :price
      t.integer :cart_id
      t.integer :quantity
      t.integer :purchasable_id
      t.string :purchasable_type

      t.timestamps
    end
  end

  def self.down
    drop_table :line_items
  end
end
