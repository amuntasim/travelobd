class RenameStatesToDivisions < ActiveRecord::Migration
  def self.up
    rename_table :states, :divisions
  end

  def self.down
    rename_table  :divisions, :states
  end
end
