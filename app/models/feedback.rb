class Feedback < ActiveRecord::Base
  acts_as_tree
  validates :name, :presence=> true
  validates :email, :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create }
  validates :subject, :presence=> true
  validates :content, :presence=> true
 
end
