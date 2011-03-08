class AddEmailToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :email, :string
  end

  def self.down
    remove_column :packages, :email
  end
end
