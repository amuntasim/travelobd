class AddRefIdToMessages < ActiveRecord::Migration
  def self.up
    add_column :messages, :ref_id, :integer
    add_column :messages, :parent_id, :integer

  end

  def self.down
    remove_column :messages, :ref_id, :parent_id
  end
end
