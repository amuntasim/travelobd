class CreateOwnershipRequests < ActiveRecord::Migration
  def self.up
    create_table :ownership_requests do |t|
      t.string :resource_type
      t.integer :resource_id
      t.string :name
      t.string :company
      t.string :designation
      t.string :phone
      t.string :email
      t.integer :user_id
      t.text :message

      t.timestamps
    end
  end

  def self.down
    drop_table :ownership_requests
  end
end
