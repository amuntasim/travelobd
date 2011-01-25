class TranslateArticle < ActiveRecord::Migration
  def self.up
    Article.create_translation_table! :title => :string, :detail => :text
    remove_columns :articles, :title, :detail
  end

  def self.down
    drop_table :article_translations
    add_column  :articles, :title, :string
    add_column  :articles, :detail, :text
  end
end
