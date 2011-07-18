# == Schema Information
#
# Table name: hotel_assets
#
#  id                 :integer(4)      not null, primary key
#  hotel_id           :integer(4)
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer(4)
#  created_at         :datetime
#  updated_at         :datetime
#  main               :boolean(1)
#

class HotelAsset < ActiveRecord::Base
  has_attached_file :photo, :styles => {:medium => "400x300", :thumb => "80x70>"},
                    :url => "/assets/hotel_photos/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/hotel_photos/:id/:style/:basename.:extension"

  belongs_to :hotel

end
