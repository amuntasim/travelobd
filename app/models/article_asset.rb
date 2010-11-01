class ArticleAsset < ActiveRecord::Base
  has_attached_file :photo, :styles => { :medium => "400x300", :thumb => "80x70>" },
    :url  => "/assets/article_photos/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/article_photos/:id/:style/:basename.:extension"

  belongs_to :article
end
