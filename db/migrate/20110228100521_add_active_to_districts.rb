class AddActiveToDistricts < ActiveRecord::Migration
  def self.up
    add_column :districts, :active, :boolean , :default =>  true
  end

  def self.down
    remove_column :districts, :active
  end
end
