class TourClubsController < ApplicationController
  before_filter :require_user, :only=> [:new, :edit, :create, :update, :destroy]
  before_filter lambda { @active_nav = 'tour_clubs' }
  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print, :rate]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]
  layout :choose_layout
  # GET /ads
  # GET /ads.xml
  def index
    @tour_clubs = TourClub.paginate(:page=> params[:page], :per_page => 15)
    @paginate_items = @tour_clubs
    render :action => 'index_admin', :layout => 'admin' if admin?
  end

  # GET /ads/1
  # GET /ads/1.xml
  def show
    @already_saved = SavedListing.in_my_list(current_user.id, @tour_club.id, 'TourClub') if current_user
    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @tour_club }
    end
  end

  # GET /ads/new
  # GET /ads/new.xml
  def new
    @tour_club = TourClub.new
  end

  # GET /ads/1/edit
  def edit
  end

  # POST /ads
  # POST /ads.xml
  def create
    @tour_club = TourClub.new(params[:tour_club])
    @tour_club.user_id = current_user.id
    respond_to do |format|
      if @tour_club.save
        format.html { redirect_to(@tour_club, :notice => 'TourClub was successfully created.') }
      else
        format.html { render :action => "new" }
        format.xml { render :xml => @tour_club.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ads/1
  # PUT /ads/1.xml
  def update
    params[:tour_club][:destination_ids] ||= []
    respond_to do |format|
      if @tour_club.update_attributes(params[:tour_club])
        format.html { redirect_to(@tour_club, :notice => 'TourClub was successfully updated.') }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @tour_club.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ads/1
  # DELETE /ads/1.xml
  def destroy
    @tour_club.destroy

    respond_to do |format|
      format.html { redirect_to(tour_clubs_url) }
      format.xml { head :ok }
    end
  end

  def delete_asset
    asset = Asset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = Asset.find(params[:asset_id])
    Asset.update_all ['main = ?', false], ['assetable_id = ?', asset.assetable_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end


  def location_autocomplete
    districts = District.includes(:division).where(['districts.name like ?  OR divisions.name like ?', "%#{params[:term]}%", "%#{params[:term]}%"]).limit(15)
    render :json => districts.collect { |c| {"id" => c.id, "label" => "#{c.name}, #{c.division.name if c.division}", "value" => c.name} }
  end


  def search
    @tour_club_search = TourClub.search(params[:search])
    @tour_clubs = @tour_club_search.paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || 'TourClubs : Search Results '
    @paginate_items = @tour_clubs
    render :index
  end


  def print
    render :layout => 'print'
  end

  def rate
    @tour_club.rate(params[:stars], current_user, params[:dimension])
    respond_to do |format|
      format.js { render :partial => '/comments/rate', :locals => {:obj => @tour_club} }
    end

  end


  private

  def load_item
    @tour_club = TourClub.find(params[:id])
  end

  def check_ownership
    ownership_require(@tour_club)
  end

  def choose_layout
    ['new', 'edit'].include?(action_name) ? 'dashboard' : 'application'
  end
end



  
