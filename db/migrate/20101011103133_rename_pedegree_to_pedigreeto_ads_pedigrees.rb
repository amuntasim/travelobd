class RenamePedegreeToPedigreetoAdsPedigrees < ActiveRecord::Migration
  def self.up
    rename_column(:ads_pedigrees, :pedegree_id, :pedigree_id)
  end

  def self.down
     rename_column(:ads_pedigrees, :pedigree_id, :pedegree_id )
  end
end
