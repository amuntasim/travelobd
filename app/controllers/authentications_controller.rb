class AuthenticationsController < ApplicationController

  def index
    @authentications = current_user.authentications if current_user
  end

  def create
    omniauth = request.env["omniauth.auth"]
    authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
    if authentication
      flash[:notice] = "Signed in successfully."
      UserSession.create(authentication.user, true)
      redirect_to dashboard_url
    elsif current_user
      current_user.authentications.create!(:provider => omniauth['provider'], :uid => omniauth['uid'])
      options = {}
      options[:rails_env] ||= Rails.env
      args = options.map { |n, v| "#{n.to_s.upcase}='#{v}'" }
      system "/usr/bin/rake update_friends[#{current_user.id},#{omniauth[:provider]},#{omniauth[:uid]},#{omniauth['credentials']['token']}] #{args.join(' ')} --trace 2>&1 >> #{Rails.root}/log/rake.log &"
      flash[:notice] = "Authentication successful."
      redirect_to dashboard_url
    else
      user = User.new
      user.apply_omniauth(omniauth)
      if user.save
        flash[:notice] = "Signed in successfully."
        UserSession.create(authentication.user, true)
        redirect_to dashboard_url
      else
        session[:omniauth] = omniauth.except('extra')
        redirect_to new_user_url
      end
    end
  end

  def destroy
    @authentication = current_user.authentications.find(params[:id])
    @authentication.destroy
    flash[:notice] = "Successfully destroyed authentication."
    redirect_to dashboard_url
  end
end
