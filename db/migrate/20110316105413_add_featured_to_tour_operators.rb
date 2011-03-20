class AddFeaturedToTourOperators < ActiveRecord::Migration
  def self.up
    add_column :tour_operators, :featured, :boolean, :default => false
  end

  def self.down
    remove_column :tour_operators, :featured
  end
end
