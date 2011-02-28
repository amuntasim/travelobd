# == Schema Information
#
# Table name: classified_assets
#
#  id                 :integer(4)      not null, primary key
#  classified_id      :integer(4)
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer(4)
#  created_at         :datetime
#  updated_at         :datetime
#  main               :boolean(1)      default(FALSE)
#

class ClassifiedAsset < ActiveRecord::Base
  has_attached_file :photo, :styles => { :medium => "400x300", :thumb => "80x70>" },
    :url  => "/assets/classified_photos/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/classified_photos/:id/:style/:basename.:extension"

  belongs_to :classified
end
