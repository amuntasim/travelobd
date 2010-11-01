class CreateSpotAssets < ActiveRecord::Migration
  def self.up
    create_table :spot_assets do |t|
      t.integer :spot_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.timestamps
    end
    add_index(:spot_assets, :spot_id)
  end

  def self.down
    drop_table :spot_assets
  end
end
