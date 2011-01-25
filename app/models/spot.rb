class Spot < ActiveRecord::Base
  translates :name, :detail, :short_description
  has_friendly_id :name, :use_slug => true
  
  has_many :assets, :class_name => 'SpotAsset'
  has_one :main_image, :class_name => 'SpotAsset', :conditions => {:main => true}

  belongs_to :user

  scope :actives, where(:active => true)
  
  validates :category_id, :presence => true
  validates :name, :presence => true
  validates :district_id, :presence => true
  validates :division_id, :presence => true

  belongs_to :user
  belongs_to :district
  belongs_to :division
  belongs_to :country
  has_many :saved_listings, :as => :savable, :dependent => :destroy
  
  CATEGORIES = {'Hill' => 1, 'Sea' => 2, 'Wild' => 3, 'Nature' => 4 }
  accepts_nested_attributes_for :assets

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end
  
  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end

  def self.find_random(random_count, options = {})
    if random_count > count(options)
      all(options).sort_by{rand}
    else
      all(options.merge({:offset => rand(count(options) - random_count + 1), :limit => random_count})).sort_by{rand}
    end
  end

  def title
    name
  end
end
