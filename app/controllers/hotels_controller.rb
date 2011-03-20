class HotelsController < ApplicationController
  before_filter :require_user, :only =>[:new, :edit, :create, :update, :destroy]
  before_filter lambda { @active_nav = 'hotels' }

  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]

  layout :choose_layout

#  uses_tiny_mce :only =>[:new, :edit], :options => {
#      :width => '445px',
#      :height => '250px'
#  }

  # GET /hotels
  # GET /hotels.xml
  def index
    conditions = []
    conditions.add_condition!(:category_id =>params[:category_id]) unless params[:category_id].blank?
    @hotels = Hotel.paginate(:page=> params[:page], :conditions => conditions)
    @search_title = Hotel::CATEGORIES.invert[params[:category_id].to_i] || 'All Hotels'
    @paginate_items = @hotels
  end

  # GET /hotels/1
  # GET /hotels/1.xml
  def show
    @already_saved = SavedListing.in_my_list(current_user.id, @hotel.id, 'Hotel') if current_user

    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @hotel }
    end
  end

  # GET /hotels/new
  # GET /hotels/new.xml
  def new
    @hotel = Hotel.new
    @features_for_hotel = Feature.for_hotel

    respond_to do |format|
      format.html # new.html.erb
      format.xml { render :xml => @hotel }
    end
  end

  # GET /hotels/1/edit
  def edit
    @features_for_hotel = Feature.for_hotel
  end

  # POST /hotels
  # POST /hotels.xml
  def create
    @hotel = Hotel.new(params[:hotel])
    @hotel.user_id = current_user.id
    set_district_division
    respond_to do |format|
      if @hotel.save
        format.html { redirect_to(@hotel, :notice => 'Hotel was successfully created.') }
        format.xml { render :xml => @hotel, :status => :created, :location => @hotel }
      else
        @features_for_hotel = Feature.for_hotel
        format.html { render :action => "new" }
        format.xml { render :xml => @hotel.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /hotels/1
  # PUT /hotels/1.xml
  def update
    update_district_division
    params[:hotel][:feature_ids] ||= []

    respond_to do |format|
      if @hotel.update_attributes(params[:hotel])
        format.html { redirect_to(@hotel, :notice => 'Hotel was successfully updated.') }
        format.xml { head :ok }
      else
        @features_for_hotel = Feature.for_hotel
        format.html { render :action => "edit" }
        format.xml { render :xml => @hotel.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /hotels/1
  # DELETE /hotels/1.xml
  def destroy

    @hotel.destroy

    respond_to do |format|
      format.html { redirect_to(hotels_url) }
      format.xml { head :ok }
    end
  end

  def delete_asset
    asset = HotelAsset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = HotelAsset.find(params[:asset_id])
    HotelAsset.update_all ['main = ?', false], ['hotel_id = ?', asset.hotel_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end

  def search
    @hotel_search = Hotel.search(params[:search])
    ordering = "featured DESC, #{ params[:order]+ ',' unless params[:order].blank? } RAND()"
    @hotels = @hotel_search.order(ordering).paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || 'Hotels : Search Results '
    @paginate_items = @hotels
    render :index
  end

  def advance_search
    @search = Hotel.search(params[:search])
  end

  def print
    render :layout => 'print'
  end

  def load_spots
    @spots = Spot.where(:active => true, :district_id => params[:district_id])
    @attached_spots = Hotel.find(params[:hotel_id]).spots rescue []
  end

  private
  def set_district_division
    if params[:hotel][:division_id].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)', @hotel.country_id, params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => @hotel.country_id, :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      @hotel.division_id = division.id
    end

    if params[:hotel][:district_id].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ', @hotel.country_id, params[:district_str]])
      unless district
        district = District.new(:country_id => @hotel.country_id, :division_id=> @hotel.division_id, :name => params[:district_str])
        district.division_id = @spot.division_id
        district.save
      end
      @hotel.district_id = district.id
    end
  end

  def update_district_division
    unless params[:division_str].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)', params[:hotel][:country_id], params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => params[:hotel][:country_id], :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      params[:hotel][:division_id] ||= division.id
    end

    unless params[:division_str].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ', params[:hotel][:country_id], params[:district_str]])
      unless district
        district = District.new(:country_id => @hotel.country_id, :division_id=> @hotel.division_id, :name => params[:district_str])
        district.division_id = params[:hotel][:division_id]
        district.save
      end
      params[:hotel][:district_id] ||= district.id
    end
  end

  def load_item
    @hotel = Hotel.find(params[:id])
  end

  def check_ownership
    ownership_require(@hotel)
  end

  def choose_layout
    ['new', 'edit'].include?(action_name) ? 'dashboard' : 'application'
  end

end
