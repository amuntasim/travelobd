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
  default_scope order('spots.created_at DESC')

  has_many :assets, :class_name => 'SpotAsset', :dependent => :destroy
  has_one :main_image, :class_name => 'SpotAsset', :conditions => {:main => true}

  belongs_to :user

  scope :actives, where(:active => true).includes(:translations, :assets, :main_image, :slug)

  validates :name, :presence => true
  validates :description, :presence => true
  validates :district_id, :presence => true
  validates :division_id, :presence => true

  has_many :polymorphic_categories, :as => :categorizable, :dependent => :destroy
  has_many :categories, :through => :polymorphic_categories, :dependent => :destroy

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
  has_and_belongs_to_many :nearby_spots, :class_name => 'Spot',
                          :finder_sql => 'SELECT DISTINCT spots.* FROM spots
                                         JOIN  nearby_spots NS ON spots.id = NS.spot_id OR spots.id = NS.nearby_spot_id
                                          WHERE spots.id <> #{id} AND (NS.spot_id = #{id} OR NS.nearby_spot_id = #{id})',
                          :join_table => :nearby_spots, :foreign_key => :nearby_spot_id

  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}

  #before_save :save_textilize_description

  CATEGORIES = {'Hill' => 1, 'Sea' => 2, 'Wild' => 3, 'Nature' => 4}
  #accepts_nested_attributes_for :base_categories, :reject_if => :all_blank
  accepts_nested_attributes_for :assets, :reject_if => :all_blank, :allow_destroy => true
  accepts_nested_attributes_for :side_scenes, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :cost_items, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful, :price]

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    categories.collect(&:title).join(',')
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
