# == Schema Information
#
# Table name: package_assets
#
#  id                 :integer(4)      not null, primary key
#  package_id         :integer(4)
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer(4)
#  photo_updated_at   :datetime
#  created_at         :datetime
#  updated_at         :datetime
#  main               :boolean(1)      default(FALSE)
#

class PackageAsset < ActiveRecord::Base
  has_attached_file :photo, :styles => { :medium => "400x300", :thumb => "130x100>", :thumb_s => '80x70' },
    :url  => "/assets/package_photos/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/package_photos/:id/:style/:basename.:extension"
  belongs_to :ad
end
