class Transport < ActiveRecord::Base
  translates :name, :description, :address

  has_many :assets, :as => :assetable
  has_one :main_image, :class_name => 'Asset', :as => :assetable, :conditions => {:main => true}
  belongs_to :user
  has_many :branch_locations, :as => :branchable
  has_many :contacts, :as => :contactable
  has_many :policies, :as => :policiable
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}
  has_many :saved_listings, :as => :savable, :dependent => :destroy
  has_and_belongs_to_many :destinations, :class_name => "District", :join_table => 'transports_destinations'
  has_and_belongs_to_many :spots
  has_many :departure_schedules

  has_friendly_id :name, :use_slug => true


  accepts_nested_attributes_for :assets, :reject_if => :all_blank, :allow_destroy => true
  accepts_nested_attributes_for :contacts, :reject_if => lambda { |a| a[:name].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :policies, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :branch_locations, :reject_if => lambda { |a| a[:location].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :departure_schedules, :reject_if => lambda { |a| a[:time].blank? }, :allow_destroy => true

  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful, :price]


  CATEGORIES = {'cat1' => 1, 'cat2' => 2, 'cat3' => 3}

  scope :featured, where(:featured => true).includes(:translations, :assets, :main_image, :slug)

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end

  def locations
    '&nbsp;'
  end

  def locations_by_districts
    branch_locations.group_by { |b| b.district }
  end

end

