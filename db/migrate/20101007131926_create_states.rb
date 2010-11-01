class CreateDivisions < ActiveRecord::Migration
  def self.up
    create_table :divisions do |t|
      t.integer :district_id
      t.integer :country_id
      t.string :name
      t.string :code

      t.timestamps
    end

    add_index(:divisions, :district_id)
  end

  def self.down
    drop_table :divisions
  end
end
