class CreateTrUploadedImages < ActiveRecord::Migration
  def self.up
    create_table :tr_uploaded_images do |t|
      t.string :label
      t.integer :user_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.timestamps
    end
  end

  def self.down
    drop_table :tr_uploaded_images
  end
end
