class AddFieldsToAssets < ActiveRecord::Migration
  def self.up
    add_column :assets, :main, :boolean, :default => false
    add_column :assets, :label_en, :string
    add_column :assets, :label_bn, :string
  end

  def self.down
    remove_columns :assets, :main, :label_en, :label_bn
  end
end
