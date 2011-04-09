# == Schema Information
#
# Table name: rooms
#
#  id          :integer(4)      not null, primary key
#  room_id    :integer(4)
#  name        :string(255)
#  description :text
#  price       :float
#  total_room       :integer
#  active      :boolean(1)      default(TRUE)
#  created_at  :datetime
#  updated_at  :datetime
#

class Room < ActiveRecord::Base
  has_many :assets, :as => :assetable, :dependent => :destroy
  has_one :main_image, :class_name => 'Asset', :as => :assetable, :conditions => {:main => true}
  belongs_to :user
  belongs_to :hotel

  validates :hotel_id, :presence => true
  validates :name, :presence => true
  validates :price, :numericality => true, :presence => true
  validates :total_room, :numericality => true, :allow_blank => true

  has_and_belongs_to_many :features, :delete_sql => 'DELETE FROM features_rooms WHERE  room_id = #{id} AND feature_id = #{record.id}'

  accepts_nested_attributes_for :assets, :reject_if => :all_blank

  after_save :update_hotel_total_rooms_and_starting_price

  def main_image_url(style = :medium)
    main_image ? main_image.photo.url(style) : assets.size > 0 ? assets.first.photo.url(style) : ''
  end

  def title
    name
  end

  def sort_listed_features
    features.limit(3).collect(&:name).join(', ')
  end

  private
  def update_hotel_total_rooms_and_starting_price
    if total_room_changed?
      hotel.update_attribute(:total_rooms, hotel.total_rooms.to_i - total_room_was.to_i + total_room.to_i)
    else
      hotel.update_attribute(:total_rooms, hotel.total_rooms.to_i + total_room.to_i)
    end

  end
end

