class SpotsController < ApplicationController

  before_filter :require_user, :only =>[:new, :edit,:create, :update, :destroy ]
  before_filter lambda { @active_nav = 'spot'  }

  before_filter :load_item, :only =>[:show, :edit, :update, :destroy ]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]
  
  #layout :choose_layout

  uses_tiny_mce :only =>[:new, :edit],:options => {
    :width => '445px',
    :height => '250px'
  }
  
  # GET /spots
  # GET /spots.xml
  def index
    conditions = []
    conditions.add_condition!(:category_id =>params[:category_id] ) unless params[:category_id].blank?
    @spots = Spot.paginate(:page=> params[:page], :conditions => conditions)
    @search_title = Spot::CATEGORIES.invert[params[:category_id].to_i] || 'All Spots'

  end

  # GET /spots/1
  # GET /spots/1.xml
  def show
    @spot = Spot.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @spot }
    end
  end

  # GET /spots/new
  # GET /spots/new.xml
  def new
    @spot = Spot.new(:category_id =>params[:category_id])

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @spot }
    end
  end

  # GET /spots/1/edit
  def edit
    @spot = Spot.find(params[:id])
  end

  # POST /spots
  # POST /spots.xml
  def create
    @spot = Spot.new(params[:spot])
    @spot.user_id = current_user.id
    set_district_division
    respond_to do |format|
      if @spot.save
        format.html { redirect_to(@spot, :notice => 'Spot was successfully created.') }
        format.xml  { render :xml => @spot, :status => :created, :location => @spot }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @spot.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /spots/1
  # PUT /spots/1.xml
  def update
    @spot = Spot.find(params[:id])
    update_district_division
    respond_to do |format|
      if @spot.update_attributes(params[:spot])
        format.html { redirect_to(@spot, :notice => 'Spot was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @spot.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /spots/1
  # DELETE /spots/1.xml
  def destroy
    @spot = Spot.find(params[:id])
    @spot.destroy

    respond_to do |format|
      format.html { redirect_to(spots_url) }
      format.xml  { head :ok }
    end
  end

   def search
    @spot_search = Spot.search(params[:search])
    #ordering = " #{ params[:order]+ ',' unless params[:order].blank? } RAND()"
    ordering = " #{ params[:order] unless params[:order].blank? }"
    @spots = @spot_search.order(ordering).paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || 'Spots : Search Results '
    @paginate_items = @spots
    render :index
  end

  def delete_asset
    asset = SpotAsset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = SpotAsset.find(params[:asset_id])
    SpotAsset.update_all ['main = ?', false], ['spot_id = ?',asset.spot_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end
  private
  def set_district_division
    if params[:spot][:division_id].blank?
      division = Division.includes(:translations).first(:conditions =>['(division_translations.name = ? OR code = ?)', params[:division_str], params[:division_str]])
      unless division
        division = Division.new( :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      @spot.division_id = division.id
    end

    if params[:spot][:district_id].blank?
      district = District.includes(:translations).first(:conditions =>['district_translations.name = ? ', params[:district_str]])
      unless district
        district = District.new( :division_id=> @spot.division_id,  :name => params[:district_str])
        district.division_id = @spot.division_id
        district.save
      end
      @spot.district_id = district.id
    end
  end

  def update_district_division
    unless params[:division_str].blank?
      division = Division.includes(:translations).first(:conditions =>['(division_translations.name = ? OR code = ?)', params[:division_str], params[:division_str]])
      unless division
        division = Division.new( :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      params[:spot][:division_id] ||= division.id
    end

    unless params[:division_str].blank?
      district = District.includes(:translations).first(:conditions =>['district_translations.name = ? ',params[:district_str]])
      unless district
        district = District.new( :division_id=> @spot.division_id,  :name => params[:district_str])
        district.division_id = params[:spot][:division_id]
        district.save
      end
      params[:spot][:district_id] ||= district.id
    end
  end

  def choose_layout
    ['index'].include?(action_name) ? 'admin' : 'application'
  end

  def load_item
    @spot = Spot.find(params[:id])
  end
  def check_ownership
    ownership_require(@spot)
  end
  
end
