class AddPreferredInputMethodToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :preferred_input_method, :string
  end

  def self.down
    remove_column :users, :preferred_input_method
  end
end
