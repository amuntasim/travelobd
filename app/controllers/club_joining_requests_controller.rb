class ClubJoiningRequestsController < ApplicationController
  before_filter :require_user
  before_filter :load_request_message, :only =>[:show, :approve, :deny, :destroy]
  before_filter :check_ownership, :only => [:show, :approve, :deny, :destroy]
  before_filter lambda { @active_nav = 'spot' }
  layout 'dashboard'

  def index
    @active_dashboard_nav = 'club_joining_requests'
    @messages = Membership.where(:memberable_type => 'TourClub', :memberable_id => current_user.created_clubs.collect(&:id), :leave_request => false).order(:approved)
  end

  def show

  end

  def approve
    @request_message.update_attribute(:approved, true)
    redirect_to :action=>'index', :notice => "Approved Successfully"
  end

  def deny
    @request_message.update_attribute(:approved, false)
    redirect_to :action=>'index', :notice => "Denied Successfully"
  end

  def destroy
    if @request_message.leave_request?
      @request_message.destroy
      redirect_to :action => :leaving_requests, :notice => 'Approved Successfully'
    else
      redirect_to :action => :leaving_requests, :alert => 'Invalid Operation'
    end
  end

  def leaving_requests
    @active_dashboard_nav = 'club_leaving_requests'
    @messages = Membership.where(:memberable_type => 'TourClub', :memberable_id => current_user.created_clubs.collect(&:id), :leave_request => true).order(:approved)
  end

  private

  def load_request_message
    @request_message = Membership.find(params[:id])
  end

  def check_ownership
    ownership_require(@request_message.memberable)
  end


end
