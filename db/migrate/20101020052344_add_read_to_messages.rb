class AddReadToMessages < ActiveRecord::Migration
  def self.up
    add_column :messages, :read, :boolean, :default => false
    add_column :messages, :user_id, :integer
  end

  def self.down
    remove_column :messages, :read,:user_id
  end
end
