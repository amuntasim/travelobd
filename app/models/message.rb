class Message < ActiveRecord::Base
  acts_as_tree
  validates :name, :presence=> { :unless => :user_id? }
  validates :email, :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create }, :unless => :user_id?
  validates :title, :presence=> true
  validates :content, :presence=> true
  belongs_to :user
  belongs_to :seller, :class_name => 'User', :foreign_key => :seller_id
end
