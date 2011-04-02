class Comment < ActiveRecord::Base
  belongs_to :commentable, :polymorphic => true
  belongs_to :user

  validates :name, :presence => true, :unless => :user_id
  validates :email, :presence => true, :unless => :user_id
  validates :content, :presence => true
  validates :email, :format => {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create}, :unless => :user_id

  before_save :approved_if_possible!

  def comment_by
    user ? user.full_name : self.name
  end

  private
  def approved_if_possible!
    if commentable_type == 'TourClub' && !user_id.blank? && TourClub.is_member?(commentable_id, user_id)
      self.approved=true
    end
  end
end
