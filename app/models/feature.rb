# == Schema Information
#
# Table name: features
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  for_hotel  :boolean(1)
#  created_at :datetime
#  updated_at :datetime
#  active     :boolean(1)      default(TRUE)
#

class Feature < ActiveRecord::Base
  scope :for_hotel, where(:for_hotel => true)
  scope :for_room, where(:for_hotel => false)
end
