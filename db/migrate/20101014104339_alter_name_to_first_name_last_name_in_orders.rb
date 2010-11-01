class AlterNameToFirstNameLastNameInOrders < ActiveRecord::Migration
  def self.up
    rename_column(:orders, :name, :first_name)
    add_column(:orders, :last_name, :string)
  end

  def self.down
    rename_column(:orders, :first_name, :name)
    remove_column(:orders, :last_name)
  end
end
