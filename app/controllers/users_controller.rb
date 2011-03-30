class UsersController < ApplicationController

  before_filter :require_user, :except =>[:show, :new, :create, :save_item, :send_to_friends]
  before_filter :require_admin_user, :only =>[:destroy]
  before_filter :load_user, :only =>[:show, :edit, :update, :destroy]
  layout 'dashboard'
  # GET /users
  # GET /users.xml
  def index
    @users = User.all
    render :layout => 'admin'
  end

  # GET /users/1
  # GET /users/1.xml
  def show

  end

  # GET /users/new
  # GET /users/new.xml
  def new
    @user = User.new
    @user.build_profile
    @user_session = UserSession.new
    @package_current_step = 1
    render :layout=> 'application'
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.xml
  def create
    @user = User.new(params[:user])

    if session[:omniauth]
      if (User.where(:email => params[:user][:email]).size == 0)
        rand_pass = rand(32**6).to_s(32)
        @user.password = rand_pass
        @user.password_confirmation = rand_pass
        @user.apply_omniauth(session[:omniauth])
      else
        @user = User.where(:email => params[:user][:email]).first
        @user.authentications.build(:provider => session[:omniauth]['provider'], :uid => session[:omniauth]['uid'])
      end
      @user.save!
      session[:omniauth] = nil unless @user.new_record?
      redirect_to dashboard_url
    elsif @user.save
      redirect_to(dashboard_url, :notice => 'Registration Successfull.')
    else
      @user_session = UserSession.new
      render :action => "new"
    end
  end

# PUT /users/1
# PUT /users/1.xml
  def update

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(dashboard_url, :notice => 'User was successfully updated.') }
        format.xml { head :ok }
      else
        format.html { render :action => "edit", :layout=> 'dashboard' }
        format.xml { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

# DELETE /users/1
# DELETE /users/1.xml
  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(users_url) }
      format.xml { head :ok }
    end
  end

  def dashboard
    @active_dashboard_nav = 'dashboard'
    @unread_messages = Message.where(['user_id = ? AND created_by <> ?', current_user.id, current_user.id]).where(:read=> false)
    @saved_items = SavedListing.where(:user_id => current_user.id)
    @hotels = current_user.hotels
  end

  def inbox
    @messages = Message.where(['user_id = ? AND created_by <> ?', current_user.id, current_user.id]).order(:created_at).paginate(:page=> params[:page], :per_page => 20)
    @paginate_items = @messages
  end

  def outbox
    @messages = Message.where(:created_by => current_user.id).order(:created_at).paginate(:page=> params[:page], :per_page => 20)
    @paginate_items = @messages
  end

  def save_item
    unless current_user
      session[:return_to] = "/#{params[:savable_type].downcase}s/#{params[:savable_id]}"
      render(:update) do |page|
        page << 'location.href="/login"'
      end
      return
    else
      @saved_item = SavedListing.create(:user_id=> current_user.id, :savable_id=> params[:savable_id], :savable_type=> params[:savable_type])
    end
  end

  def remove_saved_item
    sl = SavedListing.find(params[:sl_id])
    redirect_to root_path, :notice=> 'invalid access' unless  sl.user_id == current_user.id
    @success = sl.destroy
    respond_to do |format|
      format.html { redirect_to(my_saved_listings_path, :notice => 'Saved item successfully deleted.') }
      format.js
    end
  end

  def saved_listings
    @items = SavedListing.where(:user_id => current_user.id).paginate(:page=> params[:page], :per_page => 10)
  end

  def hotels
    @active_dashboard_nav = 'my_hotels'
    @hotels = current_user.hotels.paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @hotels
  end

  def spots
    @active_dashboard_nav = 'my_spots'
    @spots = current_user.spots.paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @spots
  end

  def articles
    @active_dashboard_nav = 'my_articles'
    @articles = current_user.articles.paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @articles
  end

  def transports
    @active_dashboard_nav = 'my_transports'
    @transports = current_user.transports
  end

  def packages
    @active_dashboard_nav = 'my_packages'
    @packages = current_user.packages.paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @packages
  end

  def clubs
    @active_dashboard_nav = 'my_clubs'
  end

  def rooms
    @active_dashboard_nav = 'my_rooms'
    conditions = params[:hotel_id].blank? ? {} : {:hotel_id => params[:hotel_id]}
    @rooms = current_user.rooms.where(conditions).paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @rooms
  end


  def send_to_friends
    unless current_user
      session[:return_to] = "/#{params[:item_type].downcase}s/#{params[:item_id]}"
      render(:update) do |page|
        page << 'location.href="/login"'
      end
      return
    else
      Mailer.send_to_friend(params, current_user).deliver
    end
    render :update do |page|
      page << "$('#stf_summary').html('<span class=\"success\"> Message Sent</span>');"
      page << "$('#stf_summary').effect('highlight')"
    end
  end

  def upload_images
    @user = current_user.update_attributes(params[:user])
    #output = render_to_string(:partial =>'users/uploaded_image', :collection => current_user.uploaded_images)
    render :nothing => true
    return
  end

  def load_uploaded_images
    @uploaded_images = current_user.uploaded_images
  end

  def club_joining_messages
    @messages = Membership.where(:memberable_type => 'TourClub', :memberable_id => current_user.tour_clubs.collect(&:id)).order(:approved)
  end

  private
  def load_user
    u_id = admin? ? params[:id] : current_user.id
    @user = User.find(u_id)
  end


end
