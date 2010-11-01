class Division < ActiveRecord::Base
  translates :name
  #belongs_to :country
  has_many :districts
  #validates :country_id, :presence => true
end
