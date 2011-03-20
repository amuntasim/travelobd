class CreateSpotsTourOperatorsJoinTable < ActiveRecord::Migration
  def self.up
    create_table :spots_tour_operators, :id => false do |t|
      t.integer :spot_id
      t.integer :tour_operator_id
    end
  end

  def self.down
    drop_table :spots_tour_operators
  end
end
