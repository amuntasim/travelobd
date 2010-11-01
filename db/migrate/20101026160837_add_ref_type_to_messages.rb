class AddRefTypeToMessages < ActiveRecord::Migration
  def self.up
    add_column :messages, :ref_type, :string
  end

  def self.down
    remove_column :messages, :ref_type
  end
end
