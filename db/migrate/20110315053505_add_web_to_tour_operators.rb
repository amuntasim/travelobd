class AddWebToTourOperators < ActiveRecord::Migration
  def self.up
    add_column :tour_operators, :web, :string
  end

  def self.down
    remove_column :tour_operators, :web
  end
end
