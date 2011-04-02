class Condition < ActiveRecord::Base
  translates :detail
  belongs_to :conditionable, :polymorphic => true
end
