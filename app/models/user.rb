class User < ActiveRecord::Base
  has_one :profile
  has_many :ads
  attr_accessor :password_confirmation

  accepts_nested_attributes_for :profile

  acts_as_authentic do |c|
    c.login_field = :email
    c.validate_login_field false
    # c.validate_password_field = false
  end

  def is_admin
    true
    #role == 'admins'
  end

  def full_name
    profile ? "#{profile.first_name} #{profile.last_name}" : ''
  end

  def deliver_password_reset_instructions!
    reset_perishable_token!
    Mailer.password_reset_instructions(self).deliver
  end

end
