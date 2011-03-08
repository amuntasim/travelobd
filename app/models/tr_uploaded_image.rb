class TrUploadedImage < ActiveRecord::Base
  has_attached_file :photo, :styles => {:medium => "400x300", :thumb => "80x60>"},
                    :url => "/assets/tr_uploaded_images/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/tr_uploaded_images/:id/:style/:basename.:extension"
  belongs_to :user

  before_create :sanitize_file_name

  def sanitize_file_name
    self.photo_file_name.gsub!(' ', '_')
  end
end
