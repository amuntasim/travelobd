class Policy < ActiveRecord::Base
  translates :title, :detail
  belongs_to :policiable, :polymorphic => true
end
