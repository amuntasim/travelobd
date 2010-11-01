class District < ActiveRecord::Base
  translates :name
  #belongs_to :country
  belongs_to :division
  validates :division_id, :presence => true
  validates :name, :presence => true
end
