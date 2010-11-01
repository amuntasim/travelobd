class CreateAdAssets < ActiveRecord::Migration
  def self.up
    create_table :ad_assets do |t|
      t.integer :ad_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.datetime :photo_updated_at
      t.timestamps
    end
    add_index(:ad_assets, :ad_id)
  end

  def self.down
    drop_table :ad_assets
  end
end
