
# == Schema Information
#
# Table name: users
#
#  id                  :integer(4)      not null, primary key
#  name                :string(255)
#  email               :string(255)
#  crypted_password    :string(255)
#  password_salt       :string(255)
#  persistence_token   :string(255)
#  single_access_token :string(255)
#  perishable_token    :string(255)
#  login_count         :integer(4)      default(0), not null
#  failed_login_count  :integer(4)      default(0), not null
#  last_request_at     :datetime
#  current_login_at    :datetime
#  last_login_at       :datetime
#  current_login_ip    :string(255)
#  last_login_ip       :string(255)
#  created_at          :datetime
#  updated_at          :datetime
#  role                :string(255)
#

class User < ActiveRecord::Base
  has_many :authentications
  ajaxful_rater
  has_one :profile
  has_many :ads
  attr_accessor :password_confirmation

  has_many :uploaded_images, :class_name => 'TrUploadedImage'
  accepts_nested_attributes_for :profile
  accepts_nested_attributes_for :uploaded_images
  has_many :hotels

  acts_as_authentic do |c|
    c.login_field = :email
    c.validate_login_field false
    # c.validate_password_field = false
  end

  def name
     profile ? profile.full_name : self.read_attribute(:name)
  end

  def is_admin
    role == 'admins'
  end

  def full_name
    profile ? "#{profile.first_name} #{profile.last_name}" : ''
  end

  def deliver_password_reset_instructions!
    reset_perishable_token!
    Mailer.password_reset_instructions(self).deliver
  end

end
