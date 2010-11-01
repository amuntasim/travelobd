class Profile < ActiveRecord::Base
  belongs_to :user
  belongs_to :country
  has_attached_file :avatar, :styles => {:thumb => "80x70>" },
    :url  => "/assets/avatars/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/avatars/:id/:style/:basename.:extension"

end
