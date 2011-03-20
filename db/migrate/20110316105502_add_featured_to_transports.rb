class AddFeaturedToTransports < ActiveRecord::Migration
  def self.up
    add_column :transports, :featured, :boolean, :default => false
  end

  def self.down
    remove_column :transports, :featured
  end
end
