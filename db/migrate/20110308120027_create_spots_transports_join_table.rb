class CreateSpotsTransportsJoinTable < ActiveRecord::Migration
  def self.up
    create_table :spots_transports, :id => false do |t|
      t.integer :transport_id
      t.integer :spot_id
    end
    add_index :spots_transports, [:transport_id, :spot_id]
  end

  def self.down
    drop_table :spots_transports
  end
end
