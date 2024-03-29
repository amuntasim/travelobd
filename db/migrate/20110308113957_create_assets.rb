class CreateAssets < ActiveRecord::Migration
  def self.up
    create_table :assets do |t|
      t.integer :assetable_id
      t.string :assetable_type
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size

      t.timestamps
    end
  end

  def self.down
    drop_table :assets
  end
end
