class TranslateArticle < ActiveRecord::Migration
  def self.up
    create_table :article_translations do |t|
      t.column :article_id, :integer
      t.column :locale, :string
      t.column :title, :string
      t.column :detail, :text
      t.timestamps
    end
    remove_columns :articles, :title, :detail
  end

  def self.down
    drop_table :article_translations
    add_column :articles, :title, :string
    add_column :articles, :detail, :text
  end
end
