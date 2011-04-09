# == Schema Information
#
# Table name: divisions
#
#  id         :integer(4)      not null, primary key
#  country_id :integer(4)
#  code       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Division < ActiveRecord::Base
  translates :name
  #belongs_to :country
  has_many :districts
  #validates :country_id, :presence => true
  bangla_for_typus :name
end
