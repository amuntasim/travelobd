class OwnershipRequestsController < ApplicationController
  def create
    @ownership_request = OwnershipRequest.new(params[:ownership_request])
    @ownership_request.save
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
