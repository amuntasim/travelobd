class CreateConditions < ActiveRecord::Migration
  def self.up
    create_table :conditions do |t|
      t.integer :conditionable_id
      t.string :conditionable_type
      t.timestamps
    end

    create_table :condition_translations do |t|
      t.integer :condition_id
      t.string :locale
      t.text :detail
    end
  end

  def self.down
    drop_table :conditions
    drop_table :condition_translations
  end
end
