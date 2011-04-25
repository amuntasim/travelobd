class TourClub < ActiveRecord::Base
  translates :name, :description, :slogan

  validates :name, :presence => true
  validates :description, :presence => true
  has_attached_file :logo, :styles => {:medium => "400x300", :thumb => "80x70>"},
                    :url => "/assets/tour_clubs_logo/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/tour_clubs_logo/:id/:style/:basename.:extension"

  belongs_to :user
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}
  has_many :memberships, :as => :memberable
  has_many :members, :class_name => 'User', :through => :memberships, :source => :user

  has_friendly_id :name, :use_slug => true

  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful]

  def join_leave!(user)
    if members.include?(user)
      membership = memberships.where(:user_id => user.id).first
      if membership.leave_request?
        membership.update_attributes(
            :leave_request => false,
            :leave_request_date => nil
        )
      else
        membership.update_attributes(
            :leave_request => true,
            :leave_request_date => Time.now
        )
      end
    else
      memberships.create(
          :user_id => user.id
      )
    end
  end

  def title
    name
  end

  class << self
    def is_member?(club_id, user_id)
       !Membership.where(:memberable_type => 'TourClub', :memberable_id => club_id, :user_id => user_id, :approved => true).first.blank?
    end
  end
end


