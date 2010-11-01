class AdAssociation < ActiveRecord::Base
  belongs_to :ad
  #validates :ad_id, :uniqueness => {:scope => :association_id}
end
