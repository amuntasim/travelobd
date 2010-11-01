class SavedListing < ActiveRecord::Base
  belongs_to :savable, :polymorphic => true
  belongs_to :user
  validates :user_id, :presence => true, :uniqueness => {:scope => [:savable_id, :savable_type]}
  validates :savable_id, :presence => true
  validates :savable_type, :presence => true
  
  def self.in_my_list(user_id, savable_id, savable_type='Ad')
    self.where(:user_id => user_id, :savable_id => savable_id, :savable_type => savable_type).first
  end
end
