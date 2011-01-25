class Ad < ActiveRecord::Base
  translates :title, :description, :short_description
  
  has_many :videos, :class_name => 'AdVideo'
  has_many :assets, :class_name => 'AdAsset'
  has_one :main_image, :class_name => 'AdAsset', :conditions => {:main => true}
  belongs_to :user
  belongs_to :district
  belongs_to :division
  has_many :ad_disciplines
  has_many :videos, :class_name => 'AdVideo'
  has_many :saved_listings, :as => :savable, :dependent => :destroy

  has_friendly_id :title, :use_slug => true
  
  
  accepts_nested_attributes_for :videos

  has_one :line_item, :as=> 'purchasable'
  #accepts_nested_attributes_for :pedigrees
  
  CATEGORIES = {'cat1' => 1, 'cat2' => 2, 'cat3' => 3 }
  DISCIPLINES_VALUES = ['1 yr', '2 yrs', '3 yrs']
  accepts_nested_attributes_for :assets

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def category
    category_id ? CATEGORIES.invert[category_id] : nil
  end

  def listing_charge
    if self.featured
      Element.find_all_by_name('featured_package_price').value rescue 9.95
    else
      Element.find_all_by_name('basic_package_price').value rescue 4.95
    end
  end

  def purchased
    self.update_attribute(:active, true)
  end

  def location
    address = []
    address << district.name if district
    address << division.name if division
    address << country.name if country
    address.compact.join(',')
  end

  def disciplines_str
    d_arr = []
    ad_disciplines.each do |dcp|
      d_arr << "#{dcp.discipline.name} ( #{dcp.value} )"
    end
    d_arr.join('<br/>')
  end

  def self.find_random(random_count, options = {})
    if random_count > count(options)
      all(options).sort_by{rand}
    else
      all(options.merge({:offset => rand(count(options) - random_count + 1), :limit => random_count})).sort_by{rand}
    end
  end


end
