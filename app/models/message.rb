# == Schema Information
#
# Table name: messages
#
#  id         :integer(4)      not null, primary key
#  seller_id  :integer(4)
#  name       :string(255)
#  email      :string(255)
#  address    :string(255)
#  phone      :string(255)
#  content    :text
#  created_by :integer(4)
#  created_at :datetime
#  updated_at :datetime
#  read       :boolean(1)      default(FALSE)
#  user_id    :integer(4)
#  title      :string(255)
#  ref_id     :integer(4)
#  parent_id  :integer(4)
#  ref_type   :string(255)
#

class Message < ActiveRecord::Base
  acts_as_tree
  validates :name, :presence=> {:unless => :created_by?}
  validates :email, :format => {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create}, :unless => :created_by?
  validates :title, :presence=> true
  validates :content, :presence=> true
  belongs_to :owner, :class_name => 'User', :foreign_key => :created_by
  #here user means to whom the message was sent
  belongs_to :user

end