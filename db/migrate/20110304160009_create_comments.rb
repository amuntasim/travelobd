class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.integer :user_id
      t.string :name
      t.string :email
      t.text :content
      t.integer :commentable_id
      t.string :commentable_type
      t.boolean :approved, :default => false

      t.timestamps
    end
  end

  def self.down
    drop_table :comments
  end
end
