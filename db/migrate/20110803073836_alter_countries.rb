class AlterCountries < ActiveRecord::Migration
  def self.up
    remove_column :countries, :code
    add_column :countries, :active, :boolean, :default => true
  end

  def self.down
    add_column :countries, :code, :string
    remove_column :countries, :active
  end
end
