# == Schema Information
#
# Table name: hotels
#
#  id             :integer(4)      not null, primary key
#  name           :string(255)
#  description    :text
#  address        :text
#  district_id    :integer(4)
#  division_id    :integer(4)
#  phone          :string(255)
#  email          :string(255)
#  contact_person :string(255)
#  user_id        :integer(4)
#  active         :boolean(1)      default(TRUE)
#  featured       :boolean(1)      default(FALSE)
#  rating         :integer(4)
#  created_at     :datetime
#  updated_at     :datetime
#  category_id    :integer(4)      default(1)
#

class Hotel < ActiveRecord::Base
  translates :name, :description, :address

  has_many :assets, :as => :assetable
  has_one :main_image, :class_name => 'Asset', :as => :assetable, :conditions => {:main => true}
  belongs_to :user

  validates :category_id, :presence => true
  validates :name, :presence => true
  validates :district_id, :presence => true

  validates :star_rating, :inclusion => {:in => 3..5}, :allow_nil => true
  belongs_to :user
  belongs_to :district
  belongs_to :division
  has_many :saved_listings, :as => :savable, :dependent => :destroy
  has_many :rooms
  has_and_belongs_to_many :spots

  has_many :contacts, :as => :contactable
  has_many :policies, :as => :policiable
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}


  accepts_nested_attributes_for :assets, :reject_if => :all_blank, :allow_destroy => true
  accepts_nested_attributes_for :contacts, :reject_if => lambda { |a| a[:name].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :policies, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true

  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful, :price]

  has_friendly_id :name, :use_slug => true

  has_and_belongs_to_many :features, :delete_sql => 'DELETE FROM features_hotels WHERE  hotel_id = #{id} AND feature_id = #{record.id}'

  CATEGORIES = {'Hotel' => 1, 'Apartment' => 2, 'Cottage' => 3}


  scope :featured , where(:featured => true).includes(:translations,:assets, :main_image, :slug)

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end

  def title
    name
  end

  def minimum_price

  end

  def location
    address = []
    address << district.name if district
    address << division.name if division
    address.compact.join(',')
  end

  def valid_lat_long?
    latitude.length >= 2 && longitude.length >= 2
  end

  class << self
    def my_hotels(user_id)
      where(:user_id => user_id)
    end
  end
end
