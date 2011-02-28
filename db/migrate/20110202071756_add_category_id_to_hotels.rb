class AddCategoryIdToHotels < ActiveRecord::Migration
  def self.up
    add_column :hotels, :category_id, :integer, :default => 1
  end

  def self.down
    remove_column :hotels, :category_id
  end
end
