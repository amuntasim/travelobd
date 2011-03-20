class BranchLocation < ActiveRecord::Base
  belongs_to :branchable, :polymorphic => true
  belongs_to :district
  translates :location, :address, :phone
end
