# == Schema Information
#
# Table name: articles
#
#  id          :integer(4)      not null, primary key
#  user_id     :integer(4)
#  active      :boolean(1)      default(FALSE)
#  created_at  :datetime
#  updated_at  :datetime
#  category_id :integer(4)
#

class Article < ActiveRecord::Base
  translates :title, :detail
  has_friendly_id :title, :use_slug => true
  has_many :assets, :class_name => 'ArticleAsset'
  has_one :main_image, :class_name => 'ArticleAsset', :conditions => {:main => true}

  belongs_to :user
  has_many :saved_listings, :as => :savable, :dependent => :destroy

  CATEGORIES = {'Category 1' => 1, 'Category 2' => 2, 'Category 3' => 3 ,'Category 4' => 4 }

  accepts_nested_attributes_for :assets
  acts_as_taggable
  
  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end
  
  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end
end
