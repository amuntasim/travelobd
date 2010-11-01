class CreateArticleAssets < ActiveRecord::Migration
  def self.up
    create_table :article_assets do |t|
      t.integer :article_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size

      t.timestamps
    end

    add_index(:article_assets, :article_id)
  end

  def self.down
    drop_table :article_assets
  end
end
