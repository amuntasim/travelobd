class CreateDistricts < ActiveRecord::Migration
  def self.up
    create_table :districts do |t|
      t.integer :country_id
      t.integer :division_id
      t.string :name

      t.timestamps
    end
    add_index(:districts, :division_id)
  end

  def self.down
    drop_table :districts
  end
end
