class CreatePolicies < ActiveRecord::Migration
  def self.up
    create_table :policies do |t|
      t.integer :policiable_id
      t.string :policiable_type
      t.timestamps
    end

    create_table :policy_translations do |t|
      t.integer :policy_id
      t.string :locale
      t.text :title
      t.text :detail
    end
  end

  def self.down
    drop_table :policies
    drop_table :policy_translations
  end
end
