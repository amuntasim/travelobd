class CreateDistricts < ActiveRecord::Migration
  def self.up
    create_table :districts do |t|
      t.integer :country_id
      t.string :name

      t.timestamps
    end
    add_index(:districts, :country_id)
  end

  def self.down
    drop_table :districts
  end
end
