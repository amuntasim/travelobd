class CreateClassifiedAssets < ActiveRecord::Migration
  def self.up
    create_table :classified_assets do |t|
      t.integer :classified_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.timestamps
    end
    add_index(:classified_assets, :classified_id)
  end

  def self.down
    drop_table :classified_assets
  end
end
