# == Schema Information
#
# Table name: feedbacks
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  email      :string(255)
#  subject    :string(255)
#  content    :text
#  created_at :datetime
#  updated_at :datetime
#  parent_id  :integer(4)
#

class Feedback < ActiveRecord::Base
  acts_as_tree
  validates :name, :presence=> true
  validates :email, :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create }
  validates :subject, :presence=> true
  validates :content, :presence=> true
 
end
