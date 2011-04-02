class AddMoreFieldsToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :start_date, :date
    add_column :packages, :end_date, :date
    add_column :packages, :destinations, :text
  end

  def self.down
    remove_columns :packages, :start_date, :end_date, :destinations
  end
end
