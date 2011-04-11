class TourOperator < ActiveRecord::Base
  translates :name, :description, :address


  has_attached_file :logo, :styles => {:medium => "400x300", :thumb => "80x70>"},
                    :url => "/assets/tour_operators_logo/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/tour_operators_logo/:id/:style/:basename.:extension"

  belongs_to :user
  has_many :contacts, :as => :contactable
  has_many :services, :class_name => 'TitleDetailAttribute', :as => :td_attributable, :conditions => {:td_association_type => :service}
  has_many :policies, :as => :policiable
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}

  has_many :saved_listings, :as => :savable, :dependent => :destroy
  has_and_belongs_to_many :destinations, :class_name => "District"
  has_and_belongs_to_many :spots

  has_friendly_id :name, :use_slug => true

  validates :name, :presence =>  true
  validates :address, :presence =>  true

  accepts_nested_attributes_for :contacts, :reject_if => lambda { |a| a[:name].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :policies, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :services, :reject_if => lambda { |a| a[:detail].blank? }, :allow_destroy => true


  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful, :price]

  CATEGORIES = {'cat1' => 1, 'cat2' => 2, 'cat3' => 3}
  scope :featured #, where(:featured => true)

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end
end

