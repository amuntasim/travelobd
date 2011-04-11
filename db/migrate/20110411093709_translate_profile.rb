class TranslateProfile < ActiveRecord::Migration
  def self.up
    create_table :profile_translations do |t|
      t.column :profile_id, :integer
      t.column :locale, :string
      t.column :first_name, :string
      t.column :last_name, :string
      t.column :address, :string
      t.column :about, :text
      t.timestamps
    end
    remove_columns :profiles, :first_name, :last_name, :address
    add_index :profile_translations, [:profile_id, :locale]
  end

  def self.down
    drop_table :profile_translations
    add_column :profiles, :first_name, :string
    add_column :profiles, :last_name, :string
    add_column :profiles, :address, :string
  end
end
