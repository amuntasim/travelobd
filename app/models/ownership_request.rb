class OwnershipRequest < ActiveRecord::Base
  validates :email, :presence => true, :format => {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create}
  validates :name, :presence => true
  validates :company, :presence => true
  validates :resource_type, :presence => true
  validates :resource_id, :presence => true
  validates :phone, :presence => true

  belongs_to :resource, :polymorphic => true
  belongs_to :user
  attr_protected :approved

  scope :owned, lambda {|resource_type,user_id| where(:resource_type => resource_type, :user_id => user_id) }

  RESOURCE_TYPE = %W{TourOperator Hotel Transport}
  #after_save :send_email

  def self.find_using_token(p_token)
     self.where(:token => p_token).where(["token_expires > ?", Time.now]).first
  end

  def set_token_and_expires_field_and_deliver_email
    self.token= (Digest::MD5.hexdigest "#{ActiveSupport::SecureRandom.hex(10)}-#{DateTime.now.to_s}")
    self.token_expires = 2.days.from_now
    save!
    Mailer.ownership_acceptance_instructions(self).deliver
  end

  def send_ownership_request_email
    Mailer.ownership_request(self).deliver
  end

end
