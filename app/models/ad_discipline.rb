class AdDiscipline < ActiveRecord::Base
  #validates :ad_id, :uniqueness => {:scope => :discipline_id}
  belongs_to :discipline
  belongs_to :ad

  validates :ad_id, :presence => true
  validates :discipline_id, :presence => true
end
