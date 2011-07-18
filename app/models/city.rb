# == Schema Information
#
# Table name: cities
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  code       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class City < ActiveRecord::Base
  translates :name
  bangla_for_typus :name

  belongs_to :country
  validates :name, :presence => true
end
