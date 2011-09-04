class OwnershipRequestsController < ApplicationController

  def accept
    @ownership_request = OwnershipRequest.find_using_token(params[:id])

    unless @ownership_request
      flash[:notice] = "We're sorry, but we could not locate your request. \
        If you are having issues try copying and pasting the URL \
        from your email into your browser or restarting the \
        reset password process."
      redirect_to root_url
    else
      @ownership_request.approved = true
      @ownership_request.save
      flash[:notice] = "You have own your property!"
      UserSession.create(@ownership_request.user, true)
      redirect_to dashboard_url
    end

  end

  def create
    @ownership_request = OwnershipRequest.new(params[:ownership_request])
    @ownership_request.user_id = current_user.id if current_user
    @ownership_request.save
    @ownership_request.send_ownership_request_email
    render :update do |page|
      if   @ownership_request.errors.empty?
        page << "$('#ownership_request_summary').html('<span class=\"success\"> Message Sent</span>');"
        page << "$('#ownership_request_summary').effect('highlight')"
      else
        page << "$('#ownership_request_summary').html('<span class=\"error\"> Failed! Try again</span>');"
        page << "$('#ownership_request_summary').effect('highlight')"
      end
    end
  end
end
