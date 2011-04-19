class AddTourOperatorToPackages < ActiveRecord::Migration
  def self.up
    add_column :packages, :tour_operator_id, :integer
  end

  def self.down
    remove_column :packages, :tour_operator_id
  end
end
