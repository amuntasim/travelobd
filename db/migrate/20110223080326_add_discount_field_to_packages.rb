class AddDiscountFieldToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :discount, :string
    add_column :packages, :discount_till, :date
  end

  def self.down
    remove_column :packages, :discount, :discount_till
  end
end
