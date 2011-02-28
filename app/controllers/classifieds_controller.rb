class ClassifiedsController < ApplicationController
  before_filter :require_user, :only =>[:edit,:create, :update, :destroy ]
  before_filter lambda { @active_nav = 'classifieds'  }

  before_filter :load_item, :only =>[:show, :edit, :update, :destroy ]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]

  #layout :choose_layout

  uses_tiny_mce :only =>[:new, :edit],:options => {
    :width => '445px',
    :height => '250px'
  }

  # GET /classifieds
  # GET /classifieds.xml
  def index
    conditions = []
    conditions.add_condition!(:category_id =>params[:category_id] ) unless params[:category_id].blank?
    @classifieds = Classified.paginate(:page=> params[:page], :conditions => conditions)
    @search_title = Classified::CATEGORIES.invert[params[:category_id].to_i] || 'All Classifieds'
    render :action => 'index_admin', :layout => 'admin'  if admin?
  end

  # GET /classifieds/1
  # GET /classifieds/1.xml
  def show

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @classified }
    end
  end

  # GET /classifieds/new
  # GET /classifieds/new.xml
  def new
    @classified = Classified.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @classified }
    end
  end

  # GET /classifieds/1/edit
  def edit
  end

  # POST /classifieds
  # POST /classifieds.xml
  def create
    @classified = Classified.new(params[:classified])
    @classified.user_id = current_user.id
    set_district_division
    respond_to do |format|
      if @classified.save
        format.html { redirect_to(@classified, :notice => 'Classified was successfully created.') }
        format.xml  { render :xml => @classified, :status => :created, :location => @classified }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @classified.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /classifieds/1
  # PUT /classifieds/1.xml
  def update
    update_district_division
    respond_to do |format|
      if @classified.update_attributes(params[:classified])
        format.html { redirect_to(@classified, :notice => 'Classified was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @classified.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /classifieds/1
  # DELETE /classifieds/1.xml
  def destroy
   
    @classified.destroy

    respond_to do |format|
      format.html { redirect_to(classifieds_url) }
      format.xml  { head :ok }
    end
  end

  def delete_asset
    asset = ClassifiedAsset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = ClassifiedAsset.find(params[:asset_id])
    ClassifiedAsset.update_all ['main = ?', false], ['classified_id = ?',asset.classified_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end

  private
  def set_district_division
    if params[:classified][:division_id].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)',@classified.country_id, params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => @classified.country_id, :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      @classified.division_id = division.id
    end

    if params[:classified][:district_id].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ',@classified.country_id, params[:district_str]])
      unless district
        district = District.new(:country_id => @classified.country_id, :division_id=> @classified.division_id,  :name => params[:district_str])
        district.division_id = @spot.division_id
        district.save
      end
      @classified.district_id = district.id
    end
  end

  def update_district_division
    unless params[:division_str].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)',params[:classified][:country_id], params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => params[:classified][:country_id], :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      params[:classified][:division_id] ||= division.id
    end

    unless params[:division_str].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ',params[:classified][:country_id], params[:district_str]])
      unless district
        district = District.new(:country_id => @classified.country_id, :division_id=> @classified.division_id,  :name => params[:district_str])
         district.division_id = params[:classified][:division_id]
        district.save
      end
      params[:classified][:district_id] ||= district.id
    end
  end

  def load_item
    @classified = Classified.find(params[:id])
  end
  def check_ownership
    ownership_require(@classified)
  end



end
