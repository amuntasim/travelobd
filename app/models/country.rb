# == Schema Information
#
# Table name: countries
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  code       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Country < ActiveRecord::Base
  has_many :districts

  validates :name, :presence => true
end
