class UserSessionsController < ApplicationController
  def new
    @user = User.new
    @user.build_profile
    @user_session = UserSession.new
    if session[:ad_current_step]
      @package_current_step = session[:ad_current_step]
      session[:ad_current_step] = nil
    end
  end

  def create
    @user_session = UserSession.new(params[:user_session])
    if @user_session.save
      if admin?
        redirect_to admin_url, :notice => "Successfully logged in."
      else
        redirect_back_or_default dashboard_url
        #redirect_to dashboard_url, :notice => "Successfully logged in."
      end
    else
      @user =User.new
      render :action => 'new'
    end
  end

  def destroy
    @user_session = UserSession.find
    @user_session.destroy
    flash[:notice] = "Successfully logged out."
    redirect_to root_url
  end
end
