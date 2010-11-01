class CreatePedigrees < ActiveRecord::Migration
  def self.up
    create_table :pedigrees do |t|
      t.string :name
      t.boolean :active

      t.timestamps
    end

    create_table(:ads_pedigrees,:id=> false) do |t|
      t.integer :ad_id
      t.integer :pedegree_id
    end
    add_index(:ads_pedigrees, :ad_id)
  end

  def self.down
    drop_table :ads_pedigrees
  end
end
