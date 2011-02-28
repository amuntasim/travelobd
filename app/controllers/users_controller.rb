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
    @user_session         = UserSession.new
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

    respond_to do |format|
      if @user.save
        format.html { redirect_to(dashboard_url, :notice => 'Registration Successfull.') }
        format.xml { render :xml => @user, :status => :created, :location => @user }
      else
        @user_session = UserSession.new
        format.html { render :action => "new", :layout => 'application' }
        format.xml { render :xml => @user.errors, :status => :unprocessable_entity }
      end
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
    @unread_messages = Message.where(:seller_id=> current_user.id, :read=> false, :parent_id => nil).where(['user_id != ?', current_user.id])
    @hotels          = Hotel.where(:user_id => current_user.id)
  end

  def inbox
    @messages = Message.where(:seller_id=> current_user.id, :parent_id => nil).where(['user_id != ?', current_user.id]).order(:created_at).paginate(:page=> params[:page], :per_page => 20)
  end

  def outbox
    @messages = Message.where(:user_id=> current_user.id, :parent_id => nil).order(:created_at).paginate(:page=> params[:page], :per_page => 20)
  end

  def ads
    @packages = Package.where(:user_id=> current_user.id).order(:created_at).paginate(:page=> params[:page], :per_page => 10)
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

  def products
    @classifieds = Classified.where(:user_id => current_user.id).paginate(:page=> params[:page], :per_page => 10)
  end

  def spots
    @spots = Spot.where(:user_id => current_user.id).paginate(:page=> params[:page], :per_page => 10)
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

  private
  def load_user
    if admin?
      u_id = params[:id]
    else
      u_id = current_user.id
    end
    @user = User.find(u_id)
  end


end
