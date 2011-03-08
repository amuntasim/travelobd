class AddCategoryIdToTransports < ActiveRecord::Migration
  def self.up
    add_column :transports, :category_id, :integer
  end

  def self.down
    remove_column :transports, :category_id
  end
end
