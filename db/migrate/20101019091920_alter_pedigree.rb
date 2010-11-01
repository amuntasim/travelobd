class AlterPedigree < ActiveRecord::Migration
  def self.up
    drop_table(:ads_pedigrees)
    add_column :pedigrees, :ad_id, :integer
    add_column :pedigrees, :child_id, :integer
    add_column :pedigrees, :position, :integer, :default => 0
  end

  def self.down
    create_table(:ads_pedigrees,:id=> false) do |t|
      t.integer :ad_id
      t.integer :pedegree_id
    end
    add_index(:ads_pedigrees, :ad_id)

    remove_column :pedigrees, :ad_id,:child_id, :position
  end
end
