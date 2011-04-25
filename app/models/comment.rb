class Comment < ActiveRecord::Base
  belongs_to :commentable, :polymorphic => true
  belongs_to :user

  validates :name, :presence => true, :unless => :user_id
  validates :email, :presence => true, :unless => :user_id
  validates :content, :presence => true
  validates :email, :format => {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create}, :unless => :user_id
  attr_accessor :devorppa #for auto approve
  before_save :approved_if_possible!
  acts_as_tree
  def comment_by
    user ? user.full_name : self.name
  end

  private
  def approved_if_possible!
    unless devorppa.blank?
    #if commentable_type == 'TourClub' && !user_id.blank? && TourClub.is_member?(commentable_id, user_id)
      self.approved=true
    end
  end
end
