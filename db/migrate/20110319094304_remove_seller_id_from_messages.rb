class RemoveSellerIdFromMessages < ActiveRecord::Migration
  def self.up
    remove_column :messages, :seller_id
    remove_index :messages, :seller_id
  end

  def self.down
    add_column :messages, :seller_id, :integer
    add_index(:messages, :seller_id)
  end
end
