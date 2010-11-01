class AddMainToAssets < ActiveRecord::Migration
  def self.up
    add_column :ad_assets, :main, :boolean, :default=> false
    add_column :article_assets, :main, :boolean, :default=> false
    add_column :classified_assets, :main, :boolean, :default=> false
    add_column :spot_assets, :main, :boolean, :default=> false
  end

  def self.down
    add_column :ad_assets, :main
    add_column :article_assets, :main
    add_column :classified_assets, :main
    add_column :spot_assets, :main
  end
end
