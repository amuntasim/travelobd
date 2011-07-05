class CreateSpotAssets < ActiveRecord::Migration
  def self.up
    create_table :spot_assets do |t|
      t.integer :spot_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.string :label_en
      t.string :label_bn
      t.boolean :main, :default => false

      t.timestamps
    end
  end

  def self.down
    drop_table :spot_assets
  end
end
