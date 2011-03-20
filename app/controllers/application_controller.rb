class ApplicationController < ActionController::Base
  before_filter :load_required_instance_variables
  protect_from_forgery

  config.filter_parameters :password, :password_confirmation, :card_number, :card_verification


  helper_method :current_user, :logged_in?, :admin?

  private
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end

  def logged_in?
    current_user.nil? ? false : true
  end

  def admin?
    current_user && current_user.is_admin
  end

  def ownership_require(item)
    if current_user && (item.user_id == current_user.id || admin?)
      return true
    else
      redirect_to root_path, :alert=> 'Access restricted'
      return false
    end
  end

  def require_user
    unless current_user
      session_and_message

      respond_to do |accepts|
        accepts.html do
          store_location
          redirect_to new_user_session_url
        end
        accepts.js do
          render(:update) do |page|
            page << 'location.href="/login"'
          end
        end
        accepts.xml do
          headers["Status"] = "Unauthorized"
          headers["WWW-Authenticate"] = %(Basic realm="Web Password")
          render :text => "Could't authenticate you", :status => '401 Unauthorized'
        end
      end

      return false
    end
  end

  def require_admin_user
    unless current_user and current_user.is_admin
      session_and_message
      redirect_to login_url
      return false
    end
  end

  def session_and_message
    store_location
    flash[:error] = "You must be logged in to access this page"
  end

  def require_no_user
    if current_user
      store_location
      flash[:error] = "You must be logged out to access this page"
      redirect_to home_url
      return false
    end
  end

  def store_location
    session[:return_to] = request.request_uri
  end

  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end

  def current_cart
    if session[:cart_id]
      @current_cart ||= Cart.find(session[:cart_id])
      session[:cart_id] = nil if @current_cart.purchased_at
    end
    if session[:cart_id].nil?
      @current_cart = Cart.create!
      session[:cart_id] = @current_cart.id
    end
    @current_cart
  end


  def load_required_instance_variables
    @districts = District.includes(:translations,[:division,:translations])
    @articles = Article.includes(:slug).order(:created_at).limit(5)
    @featured_hotels = Hotel.featured.order('').limit(5)
    @featured_transports = Transport.featured.order('').limit(5)
    @featured_tour_operators = TourOperator.featured.order('').limit(5)
    @spots = Spot.actives
  end

end
