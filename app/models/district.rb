# == Schema Information
#
# Table name: districts
#
#  id          :integer(4)      not null, primary key
#  country_id  :integer(4)
#  division_id :integer(4)
#  created_at  :datetime
#  updated_at  :datetime
#

class District < ActiveRecord::Base
  translates :name
  #belongs_to :country
  belongs_to :division
  validates :division_id, :presence => true
  validates :name, :presence => true

  scope :actives, where(:active => true).includes(:translations).order('district_translations.name')
end
