class Contact < ActiveRecord::Base
  translates :name, :address
  belongs_to :contactable, :polymorphic => true
end
