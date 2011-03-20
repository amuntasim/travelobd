class TourClub < ActiveRecord::Base
  translates :name, :description

  has_attached_file :logo, :styles => {:medium => "400x300", :thumb => "80x70>"},
                    :url => "/assets/tour_clubs_logo/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/tour_clubs_logo/:id/:style/:basename.:extension"

  belongs_to :user
  has_many :comments, :as => :commentable
  has_many :approved_comments, :as => :commentable, :class_name => 'Comment', :conditions => {:approved => true}

  has_friendly_id :name, :use_slug => true

  ajaxful_rateable :stars => 5, :allow_update => false, :dimensions => [:useful]

end


