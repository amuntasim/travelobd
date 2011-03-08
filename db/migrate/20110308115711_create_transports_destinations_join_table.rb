class CreateTransportsDestinationsJoinTable < ActiveRecord::Migration
  def self.up
    create_table :transports_destinations, :id => false do |t|
      t.integer :transport_id
      t.integer :district_id
    end
    add_index :transports_destinations, [:transport_id, :district_id]
  end

  def self.down
    drop_table :transports_destinations
  end
end
