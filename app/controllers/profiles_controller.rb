class ProfilesController < ApplicationController
  before_filter :require_user
  before_filter :load_profile, :except =>[]

  layout :select_layout
  # GET /profiles
  # GET /profiles.xml
  def index
    @profiles = Profile.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @profiles }
    end
  end

  # GET /profiles/1
  # GET /profiles/1.xml
  def show
     @active_dashboard_nav = 'profile_home'
  end

  # GET /profiles/new
  # GET /profiles/new.xml
  def new
    @profile = Profile.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml { render :xml => @profile }
    end
  end

  # GET /profiles/1/edit
  def edit
  end

  # POST /profiles
  # POST /profiles.xml
  def create
    @profile = Profile.new(params[:profile])

    respond_to do |format|
      if @profile.save
        format.html { redirect_to(@profile, :notice => 'Profile was successfully created.') }
        format.xml { render :xml => @profile, :status => :created, :location => @profile }
      else
        format.html { render :action => "new" }
        format.xml { render :xml => @profile.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /profiles/1
  # PUT /profiles/1.xml
  def update

    respond_to do |format|
      if @profile.update_attributes(params[:profile])
        format.html { redirect_to(@profile, :notice => 'Profile was successfully updated.') }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @profile.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /profiles/1
  # DELETE /profiles/1.xml
  def destroy
    @profile.destroy

    respond_to do |format|
      format.html { redirect_to(profiles_url) }
      format.xml { head :ok }
    end
  end

  def spots
    @active_dashboard_nav = 'my_spots'
    @spots = @profile.user.spots.paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @spots
  end

  def articles
    @active_dashboard_nav = 'my_articles'
    @articles = @profile.user.articles.paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @articles
  end



  def rooms
    @active_dashboard_nav = 'my_rooms'
    conditions = params[:hotel_id].blank? ? {} : {:hotel_id => params[:hotel_id]}
    @rooms = current_user.rooms.where(conditions).paginate(:page=> params[:page], :per_page => 10)
    @paginate_items = @rooms
  end
  private
  def load_profile
    if current_user && params[:id].blank?
       @profile = current_user.profile
    else
      @profile = Profile.find(params[:id])
    end
  end

  def select_layout
    if current_user && current_user == @profile.user
      'dashboard'
    else
      'profile'
    end
  end
end
