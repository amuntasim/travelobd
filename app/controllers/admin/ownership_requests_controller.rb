class Admin::OwnershipRequestsController < Admin::ResourcesController
  after_filter :manage_ownership_request, :only => :toggle


  private
  def manage_ownership_request
    if params[:field] == 'resolved'
      if @item.resolved?
        unless @item.user.present?
          user = User.find_all_by_email(@item.email).first
          if user.nil?
            user = User.create(:email => @item.email, :password => '123456', :password_confirmation => '123456')
            user.deliver_password_reset_instructions!
          end
          @item.user = user
        end
        @item.set_token_and_expires_field_and_deliver_email
      end
    end
  end
end
