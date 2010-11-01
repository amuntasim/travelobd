class CreateArticles < ActiveRecord::Migration
  def self.up
    create_table :articles do |t|
      t.string :title
      t.text :detail
      t.integer :user_id
      t.boolean :active, :default => false

      t.timestamps
    end
    add_index(:articles, [:user_id, :active])
  end

  def self.down
    drop_table :articles
  end
end
