class OwnershipRequest < ActiveRecord::Base
 belongs_to :resource, :polymorphic => true

  after_save :send_email
  private
  def send_email
    Mailer.ownership_request(self).deliver
  end
end
