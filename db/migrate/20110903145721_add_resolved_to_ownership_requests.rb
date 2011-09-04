class AddResolvedToOwnershipRequests < ActiveRecord::Migration
  def self.up
    add_column :ownership_requests, :resolved, :boolean, :default => false
    add_column :ownership_requests, :approved, :boolean, :default => false
    add_column :ownership_requests, :token, :string
    add_column :ownership_requests, :token_expires, :datetime
  end

  def self.down
    remove_columns :ownership_requests, :resolved, :approved, :token, :token_expires
  end
end
