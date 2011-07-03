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
  default_scope order('articles.created_at DESC')

  has_friendly_id :title, :use_slug => true
  has_many :assets, :as => :assetable, :dependent => :destroy
  has_one :main_image, :class_name => 'Asset', :as => :assetable, :conditions => {:main => true}
  validates :title, :presence => true

  belongs_to :user
  has_many :saved_listings, :as => :savable, :dependent => :destroy


  has_many :polymorphic_categories, :as => :categorizable, :dependent => :destroy
  has_many :categories, :through => :polymorphic_categories, :dependent => :destroy

  accepts_nested_attributes_for :assets, :reject_if => :all_blank, :allow_destroy => true

  acts_as_taggable
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}

  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful]

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    categories.collect(&:title).join(',')
  end
end
