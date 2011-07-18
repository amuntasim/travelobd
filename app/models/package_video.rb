# == Schema Information
#
# Table name: package_videos
#
#  id         :integer(4)      not null, primary key
#  package_id :integer(4)
#  code       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class PackageVideo < ActiveRecord::Base
  #validates :package_id, :uniqueness => {:scope => :code}
end
