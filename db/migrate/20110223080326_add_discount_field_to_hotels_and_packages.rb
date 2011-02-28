class AddDiscountFieldToHotelsAndPackages < ActiveRecord::Migration
  def self.up
    add_column :hotels, :discount, :string
    add_column :hotels, :discount_till, :date
    add_column :packages, :discount, :string
    add_column :packages, :discount_till, :date
  end

  def self.down
    remove_columns :hotels, :discount, :discount_till
    remove_column :packages, :discount, :discount_till
  end
end
