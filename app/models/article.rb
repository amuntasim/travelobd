class Article < ActiveRecord::Base
  has_many :assets, :class_name => 'ArticleAsset'
  has_one :main_image, :class_name => 'ArticleAsset', :conditions => {:main => true}

  belongs_to :user
  has_many :saved_listings, :as => :savable, :dependent => :destroy

  CATEGORIES = {'Ad News' => 1, 'Hunter/Jumper ' => 2, 'Dressaage Ad' => 3 ,'Western Ad' => 4 }

  accepts_nested_attributes_for :assets

  def main_image_url(style = :medium)
     main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end
  
  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end
end
