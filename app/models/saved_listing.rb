# == Schema Information
#
# Table name: saved_listings
#
#  id           :integer(4)      not null, primary key
#  user_id      :integer(4)
#  savable_id   :integer(4)
#  savable_type :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#

class SavedListing < ActiveRecord::Base
  belongs_to :savable, :polymorphic => true
  belongs_to :user
  validates :user_id, :presence => true, :uniqueness => {:scope => [:savable_id, :savable_type]}
  validates :savable_id, :presence => true
  validates :savable_type, :presence => true
  
  def self.in_my_list(user_id, savable_id, savable_type='Package')
    self.where(:user_id => user_id, :savable_id => savable_id, :savable_type => savable_type).first
  end
end
