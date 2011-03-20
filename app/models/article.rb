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
  has_many :assets, :as => :assetable
  has_one :main_image, :class_name => 'Asset', :as => :assetable, :conditions => {:main => true}

  belongs_to :user
  has_many :saved_listings, :as => :savable, :dependent => :destroy

  CATEGORIES = {'Category 1' => 1, 'Category 2' => 2, 'Category 3' => 3, 'Category 4' => 4}

  accepts_nested_attributes_for :assets
  acts_as_taggable
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}

  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful]

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end
end
