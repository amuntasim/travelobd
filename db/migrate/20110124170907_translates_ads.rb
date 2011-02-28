class TranslatesAds < ActiveRecord::Migration
  def self.up
    create_table  :ad_translations do |t|
      t.column :ad_id, :integer
      t.column :locale, :string
      t.column :title, :string
      t.column :description, :text
      t.timestamps
    end
    remove_columns :ads, :title, :description
  end

  def self.down
    drop_table :ad_translations
    add_column  :ads, :title, :string
    add_column  :ads, :description, :text
  end

end
