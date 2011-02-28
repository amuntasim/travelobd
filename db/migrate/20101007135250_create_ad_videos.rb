class CreateAdVideos < ActiveRecord::Migration
  def self.up
    create_table :ad_videos do |t|
      t.integer :ad_id
      t.string :code

      t.timestamps
    end
    add_index :ad_videos, :ad_id
  end

  def self.down
    drop_table :ad_videos
  end
end
