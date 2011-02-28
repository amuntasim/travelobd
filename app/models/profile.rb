# == Schema Information
#
# Table name: profiles
#
#  id                  :integer(4)      not null, primary key
#  user_id             :integer(4)
#  first_name          :string(255)
#  last_name           :string(255)
#  address             :string(255)
#  district            :string(255)
#  division            :string(255)
#  zip_code            :string(255)
#  country_id          :integer(4)
#  avatar_file_name    :string(255)
#  avatar_content_type :string(255)
#  avatar_file_size    :integer(4)
#  created_at          :datetime
#  updated_at          :datetime
#

class Profile < ActiveRecord::Base
  belongs_to :user
  belongs_to :country
  has_attached_file :avatar, :styles => {:thumb => "80x70>" },
    :url  => "/assets/avatars/:id/:style/:basename.:extension",
    :path => ":rails_root/public/assets/avatars/:id/:style/:basename.:extension"

end
