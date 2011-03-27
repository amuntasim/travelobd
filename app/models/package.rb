# == Schema Information
#
# Table name: packages
#
#  id                :integer(4)      not null, primary key
#  category_id       :integer(4)
#  breed_id          :integer(4)
#  user_id           :integer(4)
#  ad_name           :string(255)
#  short_description :string(255)
#  price             :float
#  birth_date        :date
#  temperament       :integer(4)
#  district_id       :integer(4)
#  division_id       :integer(4)
#  country_id        :integer(4)
#  zip_code          :string(255)
#  phone             :string(255)
#  gender            :string(255)
#  active            :boolean(1)      default(FALSE)
#  featured          :boolean(1)      default(FALSE)
#  expire_at         :date
#  created_at        :datetime
#  updated_at        :datetime
#

class Package < ActiveRecord::Base
  translates :title, :description, :short_description, :location, :price_includes, :price_excludes, :company

  validates :category_id, :presence => true
  validates :title, :presence => true
  validates :price, :presence => true
  validates :short_description, :presence => true

  has_many :videos, :class_name => 'PackageVideo'
  has_many :assets, :as => :assetable
  has_one :main_image, :class_name => 'Asset', :as => :assetable, :conditions => {:main => true}
  belongs_to :user

  has_many :events, :class_name => 'PackageEvent'
  has_many :itineraries, :class_name => 'PackageItinerary'
  has_many :contacts, :as => :contactable
  has_many :conditions, :as => :conditionable
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}

  has_many :saved_listings, :as => :savable, :dependent => :destroy
  has_and_belongs_to_many :destinations, :class_name => "District", :join_table => 'packages_destinations'
  has_and_belongs_to_many :spots

  has_friendly_id :title, :use_slug => true


  accepts_nested_attributes_for :videos, :reject_if => lambda { |a| a[:code].length < 10 }, :allow_destroy => true
  accepts_nested_attributes_for :assets, :reject_if => :all_blank, :allow_destroy => true
  accepts_nested_attributes_for :events, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :itineraries, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :contacts, :reject_if => lambda { |a| a[:name].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :conditions, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true


  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful, :price]


  CATEGORIES = {'cat1' => 1, 'cat2' => 2, 'cat3' => 3}

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end

end
