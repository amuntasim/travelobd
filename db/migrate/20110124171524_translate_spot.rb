class TranslateSpot < ActiveRecord::Migration
  def self.up
    create_table :spot_translations do |t|
      t.column :spot_id, :integer
      t.column :locale, :string
      t.column :name, :string
      t.column :description, :text
      t.timestamps
    end
    remove_columns :spots, :name, :detail
  end

  def self.down
    drop_table :spot_translations
    spotd_column :spots, :name, :string
    spotd_column :spots, :detail, :text
  end
end
