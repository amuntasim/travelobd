class CreateMemberships < ActiveRecord::Migration
  def self.up
    create_table :memberships do |t|
      t.integer :user_id
      t.integer :memberable_id
      t.string :memberable_type
      t.boolean :approved, :default => false
      t.boolean :leave_request, :default => false
      t.datetime :leave_request_date
      t.timestamps
    end
  end

  def self.down
    drop_table :memberships
  end
end
