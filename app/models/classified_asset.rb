class ClassifiedAsset < ActiveRecord::Base
  has_attached_file :photo, :styles => { :medium => "400x300", :thumb => "80x70>" },
    :url  => "/assets/classified_photos/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/classified_photos/:id/:style/:basename.:extension"

  belongs_to :classified
end
