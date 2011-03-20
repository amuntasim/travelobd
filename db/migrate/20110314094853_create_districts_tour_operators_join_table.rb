class CreateDistrictsTourOperatorsJoinTable < ActiveRecord::Migration
  def self.up
    create_table :districts_tour_operators, :id => false do |t|
      t.integer :district_id
      t.integer :tour_operator_id
    end
  end

  def self.down
    drop_table :districts_tour_operators
  end
end
