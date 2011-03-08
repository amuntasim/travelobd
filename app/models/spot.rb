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
  translates :name, :description, :short_description, :textilize_description
  has_friendly_id :name, :use_slug => true

  has_many :assets, :class_name => 'SpotAsset'
  has_one :main_image, :class_name => 'SpotAsset', :conditions => {:main => true}

  belongs_to :user

  scope :actives, where(:active => true)

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

  #before_save :save_textilize_description

  CATEGORIES = {'Hill' => 1, 'Sea' => 2, 'Wild' => 3, 'Nature' => 4}
  accepts_nested_attributes_for :assets

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end

  def self.find_random(random_count, options = {})
    if random_count > count(options)
      all(options).sort_by { rand }
    else
      all(options.merge({:offset => rand(count(options) - random_count + 1), :limit => random_count})).sort_by { rand }
    end
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
end
