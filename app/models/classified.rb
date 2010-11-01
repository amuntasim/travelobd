class Classified < ActiveRecord::Base
  has_many :assets, :class_name => 'ClassifiedAsset'
  has_one :main_image, :class_name => 'ClassifiedAsset', :conditions => {:main => true}
  belongs_to :user

  validates :category_id, :presence => true
  validates :name, :presence => true
  validates :country_id, :presence => true
  validates :district_id, :presence => true

  belongs_to :user
  belongs_to :district
  belongs_to :division
  belongs_to :country
  has_many :saved_listings, :as => :savable, :dependent => :destroy

  CATEGORIES = {'Ads for Sale' => 1, 'Products for Sale' => 2, 'Trailers for Sale' => 3 }
  accepts_nested_attributes_for :assets

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end

  def title
    name
  end
end
