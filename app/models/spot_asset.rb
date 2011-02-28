# == Schema Information
#
# Table name: spot_assets
#
#  id                 :integer(4)      not null, primary key
#  spot_id            :integer(4)
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer(4)
#  created_at         :datetime
#  updated_at         :datetime
#  main               :boolean(1)      default(FALSE)
#

class SpotAsset < ActiveRecord::Base
  has_attached_file :photo, :styles => { :medium => "400x300", :thumb => "80x70>" },
    :url  => "/assets/spot_photos/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/spot_photos/:id/:style/:basename.:extension"

  belongs_to :spot
end
