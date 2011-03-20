# == Schema Information
#
# Table name: spots
#
#  id          :integer(4)      not null, primary key
#  category_id :integer(4)
#  district_id :integer(4)
#  division_id :integer(4)
#  country_id  :integer(4)
#  zip_code    :string(255)
#  phone       :string(255)
#  user_id     :integer(4)
#  active      :boolean(1)      default(TRUE)
#  created_at  :datetime
#  updated_at  :datetime
#

class Spot < ActiveRecord::Base
  translates :name, :description, :short_description, :history, :how_to_go, :where_to_stay
  has_friendly_id :name, :use_slug => true

  has_many :assets, :as => :assetable
  has_one :main_image, :class_name => 'Asset', :as => :assetable, :conditions => {:main => true}

  belongs_to :user

  scope :actives, where(:active => true).includes(:translations, :assets, :main_image, :slug)

  validates :category_id, :presence => true
  validates :name, :presence => true
  validates :description, :presence => true
  validates :district_id, :presence => true
  validates :division_id, :presence => true

  belongs_to :user
  belongs_to :district
  belongs_to :division
  belongs_to :country
  has_many :saved_listings, :as => :savable, :dependent => :destroy
  has_many :side_scenes, :class_name => 'TitleDetailAttribute', :as => :td_attributable, :conditions => {:td_association_type => :side_scene}
  has_many :cost_items, :class_name => 'TitleDetailAttribute', :as => :td_attributable, :conditions => {:td_association_type => :cost_item}

  has_and_belongs_to_many :packages
  has_and_belongs_to_many :transports
  has_and_belongs_to_many :hotels
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}

  #before_save :save_textilize_description

  CATEGORIES = {'Hill' => 1, 'Sea' => 2, 'Wild' => 3, 'Nature' => 4}
  accepts_nested_attributes_for :assets, :reject_if => :all_blank, :allow_destroy => true
  accepts_nested_attributes_for :side_scenes, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :cost_items, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful, :price]

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end


  def title
    name
  end

  def location
    address = []
    address << district.name if district
    address << division.name if division
    address.compact.join(',')
  end

  def save_textilize_description
    tmp_description = description.clone
    matches = tmp_description.scan(/\[(\w+)\](.*?)\[\/\w+\]/im)
    matches.each do |match|
      if Constant::TINY_REDCLOTH_TAGS.include?(match[0])
        if match[0] == 'TRIMG'
          tmp_description.gsub!("[#{match[0]}]#{match[1]}[/#{match[0]}]", "!#{match[1]}!")
        end
      end
    end
    self.textilize_description = tmp_description
  end

  def valid_lat_long?
    !latitude.nil? && latitude.length >= 2 && !longitude.nil? && longitude.length >= 2
  end
end
