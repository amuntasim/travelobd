class TitleDetailAttribute < ActiveRecord::Base
   translates :title, :detail
  belongs_to :td_attributable, :polymorphic =>  true
end
