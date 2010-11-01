class CreateAdAssociations < ActiveRecord::Migration
  def self.up
    create_table :ad_associations do |t|
      t.integer :ad_id
      t.integer :association_id
      t.string :value

      t.timestamps
    end
     add_index(:ad_associations, [:ad_id, :association_id])
  end

  def self.down
    drop_table :ad_associations
  end
end
